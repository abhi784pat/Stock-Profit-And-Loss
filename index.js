// Step 1 - selecting all the elements
const stocksQuantity = document.querySelector("#stocks-quantity");
const initialPrice = document.querySelector("#initial-price");
const currentPrice = document.querySelector("#current-price");
const submitBtn = document.querySelector("#submit-btn");
const outputBox = document.querySelector("#output-box");
const currpricbtn=document.querySelector("#cuur-pr-btn");
const ibmprice=document.querySelector("#curr-pr")
const outputgif=document.querySelector("#out-put-gif")

const SERVER_URL="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=7INS0MCCHY2HUVI4";


currpricbtn.addEventListener("click",()=>
{
    ibmprice.innerText="";
    fetch(SERVER_URL)
    .then(res=>res.json())
    .then(data=>{
       const val=(data["Time Series (5min)"]);
       const [date]=Object.keys(val)
       const price=Number(data["Time Series (5min)"][date]["1. open"]);
    ibmprice.innerText=`Current IBM Stock Price is ${price}$`
   
  
    })
    .catch(err=>{ alert("Server did not respond")})
  
}
)


submitBtn.addEventListener("click", submitHandler);

function submitHandler() {
  const ip = Number(initialPrice.value);
  const qty = Number(stocksQuantity.value);
  const curr = Number(currentPrice.value);

  calculateProfitAndLoss(ip, qty, curr);
}


function calculateProfitAndLoss(initial, quantity, current) 
{
    outputgif.innerHTML=""
    if(isNaN(initial)||isNaN(quantity)|| isNaN(current))
    {
        showOutput("Please Enter Numeric Value")
    }
else if(initial>0 && quantity>0 && current >0)
{
  if (initial > current) {
    const loss = (initial - current) * quantity;
    const lossPercentage = ((loss / initial) * 100).toFixed(4);

//outputgif.
    const newImg = document.createElement('img');
    newImg.src='./images/loss.jpg'
    newImg.style.height = '200px';
    newImg.style.width = '170px'
    outputgif.appendChild(newImg)


    showOutput(
      `Hey, the loss is ${loss} and the percent is`+lossPercentage+"😿" +"😿"+"😿"+"😿"+"😿"+"😿"+"😿"+"😿"+"😿"+"😿"
    );
  } else if (current > initial) {
    const profit = (current - initial) * quantity;
    const profitPercentage = ((profit / initial) * 100).toFixed(4);
    const newImg = document.createElement('img');
    newImg.src='./images/profit.jpg'
    outputgif.appendChild(newImg)

    showOutput(
      `Hey, the profit is ${profit} and the percent is `+profitPercentage+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"+"🤑"
    );
  } 
  else
  {
      showOutput("Neither Profit Nor gain")
  }
}
else{
    showOutput("Please Enter Positive Value")
}
}

function showOutput(message) {
  outputBox.innerHTML = message;
}