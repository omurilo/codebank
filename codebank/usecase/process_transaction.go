package usecase

import (
	"encoding/json"
	"os"
	"time"

	"github.com/omurilo/codebank/domain"
	"github.com/omurilo/codebank/dto"
	"github.com/omurilo/codebank/infrastructure/kafka"
)

type UseCaseTransaction struct {
	TransactionRepository domain.TransactionRepository
	KafkaProducer         kafka.KafkaProducer
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{TransactionRepository: transactionRepository}
}

func (u UseCaseTransaction) ProcessTransaction(transactionDto dto.Transaction) (domain.Transaction, error) {
	creditCard := u.hydrateCreditCard(transactionDto)
	ccBalanceAndLimit, err := u.TransactionRepository.GetCreditCard(*creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}

	creditCard.ID = ccBalanceAndLimit.ID
	creditCard.Limit = ccBalanceAndLimit.Limit
	creditCard.Balance = ccBalanceAndLimit.Balance

	t := u.newTransaction(transactionDto, ccBalanceAndLimit)
	t.ProcessAndValidate(creditCard)
	err = u.TransactionRepository.SaveTransaction(*t, *creditCard)
	if err != nil {
		return *t, err
	}
	transactionDto.ID = t.ID
	transactionDto.CreatedAt = t.CreatedAt
	transactionDto.Status = t.Status
	transactionJson, err := json.Marshal(transactionDto)
	if err != nil {
		return domain.Transaction{}, nil
	}

	err = u.KafkaProducer.Publish(string(transactionJson), os.Getenv("KafkaTransactionsTopic"))
	if err != nil {
		return domain.Transaction{}, nil
	}

	return *t, nil
}

func (u UseCaseTransaction) hydrateCreditCard(transactionDto dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()
	creditCard.Name = transactionDto.Name
	creditCard.Number = transactionDto.Number
	creditCard.ExpirationMonth = transactionDto.ExpirationMonth
	creditCard.ExpirationYear = transactionDto.ExpirationYear
	creditCard.CVV = transactionDto.CVV

	return creditCard
}

func (u UseCaseTransaction) newTransaction(transactionDto dto.Transaction, creditCard domain.CreditCard) *domain.Transaction {
	transaction := domain.NewTransaction()
	transaction.CreditCardId = creditCard.ID
	transaction.Amount = transactionDto.Amount
	transaction.Store = transactionDto.Store
	transaction.Description = transactionDto.Description
	transaction.CreatedAt = time.Now()

	return transaction
}
