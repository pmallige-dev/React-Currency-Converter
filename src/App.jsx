import CurrencyImg from './img/exchange.png';
import Currency from './components/Currency/Currency.component'
import { useEffect, useState } from 'react';
import './App.css'


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
        setCurrencyOneSelected(currencyTwoSelected);
        setCurrencyTwoSelected(currencyOneSelected);
    }

    return (
        <div className="app-container ui center aligned segment">
            <img src={CurrencyImg} alt="Currency converter" />

            <div>
                <h1>Currency Converter App</h1>
                <p>Choose the currency and the amounts to get the exchange rate</p>
            </div>

            <Currency
                currencyId="currency-one"
                amountId="amount-one"
                selectedValue={currencyOneSelected}
                onSelectChangeHandler={onSelectChangeHandlerCurrencyOne}
                amountOneInputChange={amountOneInputChange}
            />

            <div className="swap-btn-container">
                <button className="swap-btn ui primary button" onClick={swapCurrencyHandler}>Swap</button>
                <span className="rate-container">
                    <strong>
                        1 {currencyOneSelected} = {rate} {currencyTwoSelected}
                    </strong>
                </span>
            </div>

            <Currency
                currencyId="currency-two"
                amountId="amount-two"
                selectedValue={currencyTwoSelected}
                onSelectChangeHandler={onSelectChangeHandlerCurrencyTwo}
                amountTwo={amountTwo}
            />

            <div className="footer-container">
                <a href="https://www.flaticon.com/free-icons/currency" title="currency icons">Currency icons created by Pixel perfect - Flaticon</a>
                <br />
                This App is created by Prakyath Mallige
            </div>
        </div>
    )
}

export default App;