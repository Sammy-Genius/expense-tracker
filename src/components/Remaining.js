const Remaining = ({expenseList, budget}) => {

    const sumOfExpenses = expenseList.reduce((total, item) => {
        return Number(total + item.cost);
    }, 0);

    const notify = sumOfExpenses > budget ? 'red' : 'green';

    return ( 
        <div className={notify}>
            <p>Remaining: GHS {(Number(budget) - Number(sumOfExpenses)).toFixed(2)} </p>
        </div>
     );
}
 
export default Remaining;