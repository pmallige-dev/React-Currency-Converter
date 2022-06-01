import CurrencyImg from './img/exchange.png';
import Currency from './components/Currency/Currency.component'
import { useEffect, useState } from 'react';


const App = () => {

    let [currencyOneSelected, setCurrencyOneSelected] = useState('USD');
    let [currencyTwoSelected, setCurrencyTwoSelected] = useState('INR');
    const [rate, setRate] = useState(0);
    const [amountOne, setAmountOne] = useState(0);
    const [amountTwo, setAmountTwo] = useState(0);

    useEffect(() => {
        fetchCurrencyAndCalculate();
    }, [currencyOneSelected, currencyTwoSelected, amountOne]);

    const fetchCurrencyAndCalculate = async () => {
        try {
            const fetchResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_ACCESS_KEY}/latest/${currencyOneSelected}`);
            const currencyResponse = await fetchResponse.json();
            const currencyRate = currencyResponse.conversion_rates[currencyTwoSelected];
            setRate(currencyRate);
            const calculateCurrencyAmountTwo = (amountOne * currencyRate).toFixed(2);
            setAmountTwo(calculateCurrencyAmountTwo);
        } catch (error) {
            console.log(error);
        }
    }

    const onSelectChangeHandlerCurrencyOne = (event) => {
        const selectionValue = event.target.value;
        setCurrencyOneSelected(selectionValue);
    }

    const onSelectChangeHandlerCurrencyTwo = (event) => {
        const selectionValue = event.target.value;
        setCurrencyTwoSelected(selectionValue);
    }

    const amountOneInputChange = (event) => {
        const inputValue = event.target.value;
        setAmountOne(inputValue);
    }

    const swapCurrencyHandler = () => {
        // let temp = currencyOneSelected;
        // currencyOneSelected = currencyTwoSelected;
        // currencyTwoSelected  = temp;
        setCurrencyOneSelected(currencyTwoSelected);
        setCurrencyTwoSelected(currencyOneSelected);
    }

    return (
        <div>
            <div className="logo-container">
                <img src={CurrencyImg} alt="Currency converter" />
            </div>
            <h1>Currency Converter App</h1>
            <p>Choose the currency and the amounts to get the exchange rate</p>

            <Currency
                currencyId="currency-one"
                amountId="amount-one"
                selectedValue={currencyOneSelected}
                onSelectChangeHandler={onSelectChangeHandlerCurrencyOne}
                amountOneInputChange={amountOneInputChange}
            />

            <button onClick={swapCurrencyHandler}>Swap</button>

            <div className="rate-container">{rate}</div>

            <Currency
                currencyId="currency-two"
                amountId="amount-two"
                selectedValue={currencyTwoSelected}
                onSelectChangeHandler={onSelectChangeHandlerCurrencyTwo}
                amountTwo={amountTwo}
            />
        </div>
    )
}

export default App;