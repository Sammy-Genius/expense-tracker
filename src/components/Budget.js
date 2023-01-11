const Budget = ( { budget } ) => {
    return ( 
        <div className="box">
            <p>Budget: GHS { Number(budget).toFixed(2) }</p>
        </div>
     );
}
 
export default Budget;