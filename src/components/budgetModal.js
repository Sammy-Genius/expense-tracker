const BudgetModal = ({budgetModal, openBudgetModal, setBudget }) => {
    return ( 
        <>
        { budgetModal && ( <div className="modal-overlay">
            <div className="m-box">
                <h2>Set Your Budget</h2>
                <div className="input">
                    <input type="text" placeholder="enter your budget..." onChange={e => setBudget(e.target.value)}/>
                    <div className="add-box">
                        <button className="add-budget-btn" onClick={ openBudgetModal }>Add Budget</button>
                    </div>
                    <span className="close-bm" onClick={ openBudgetModal }>&times;</span>
                </div>
            </div>
        </div>
        )}
        </>
     );
}
 
export default BudgetModal;