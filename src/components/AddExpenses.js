const AddExpenses = ({ addExpenses, setItemSpentOn, setCost, cost, itemSpentOn }) => {
    return ( 
        <>
            <h2>ADD EXPENSES</h2>
            <div className="addExpense">
                <div className="input-three">
                    <input className="itemText" type="text" value={itemSpentOn} placeholder="Name of expenses..." onChange={e => setItemSpentOn(e.target.value)}/>
                </div>
                <div className="input-three">
                    <input className="itemText" type="text" value={cost} placeholder="Cost of expenses..." onChange={e => setCost(e.target.value)}/>
                </div>
                <button className="addExpense-btn" onClick = { addExpenses }>Add Expense</button>
            </div>
        </>
     );
}
 
export default AddExpenses;