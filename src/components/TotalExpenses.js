const TotalExpenses = ({expenseList}) => {

    const sumOfExpenses = expenseList.reduce((total, item) => {
        return Number(total + item.cost);
    }, 0)

    return ( 
        <div className="box">
            <p>Spent so far: GHS {Number(sumOfExpenses).toFixed(2)}</p>
        </div>
     );
}
 
export default TotalExpenses;