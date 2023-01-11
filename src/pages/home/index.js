import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Text } from "../../components";
import AddExpenses from "../../components/AddExpenses";
import Budget from "../../components/Budget";
import BudgetModal from "../../components/budgetModal";
import MomoModal from "../../components/MomoModal";
import Remaining from "../../components/Remaining";
import TotalExpenses from "../../components/TotalExpenses";
import { useSession } from "../../hooks/useSession";


export const Home = () => {
  const navigate = useNavigate();
  const { setSession, getUser } = useSession();

  const user = getUser();

  const logout = () => {
    setSession({ user: null });
    navigate("/login");
  };


  const [budget, setBudget] = useState(0);
  const [momoModal, setMomoModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [itemSpentOn, setItemSpentOn] = useState('');
  const [cost, setCost] = useState('');

  const openBudgetModal = () => {
    setBudgetModal(!budgetModal);
  }

  const openMomoModal = () => {
    setMomoModal(!momoModal);
  }

  const addExpenses = () => {
    setExpenseList([...expenseList, {itemSpentOn: itemSpentOn, cost: Number(cost), id: expenseList.length}]);
    setItemSpentOn('');
    setCost('');
  }

  const deleteExpenses = (id) => {
    const updatedExpenses = expenseList.filter(expenses => expenses.id !== id);
    setExpenseList(updatedExpenses);
  }

  return (
    <Container size="md">
      <h1>DASHBOARD</h1>
      <br />

      {user && <Text>Welcome, {user?.displayName || user.email}</Text>}
      <br />

      <div className="container">
        <div className="wrapper">
          <div className="outcome-box">
            <Budget budget = { budget }/>
            <TotalExpenses expenseList = { expenseList } />
            <Remaining expenseList = { expenseList } budget = {budget}/>
          </div>
          <div className="buttons-box">
            <button onClick={ openBudgetModal }>Set Budget</button>
            <button onClick={ openMomoModal }>Add Mobile Money Wallet</button>
          </div>
        </div>
        <div className="wrapper-two">
          <h2>EXPENSES</h2>
          <div className="expenseContainer">
            {expenseList.map((expenses) => {
              return <div className="expenseList"> 
                <p>{expenses.itemSpentOn}</p>
                <div className="area-box">
                  <p>GHS {Number(expenses.cost).toFixed(2)}</p>
                  <span onClick={() => deleteExpenses(expenses.id)}>&times;</span>
                </div>
              </div>
            })}
          </div>
        </div>
        <div className="wrapper-three">
          <AddExpenses 
          addExpenses = { addExpenses } 
          setItemSpentOn = {setItemSpentOn} 
          setCost = {setCost} 
          cost = { cost }
          itemSpentOn = { itemSpentOn } />
        </div>
        <BudgetModal budgetModal = {budgetModal} openBudgetModal = { openBudgetModal } setBudget = {setBudget } />
        <MomoModal momoModal = { momoModal } openMomoModal = { openMomoModal } setBudget = {setBudget } />
      </div>
      
      <br />
      <Button onClick={logout}>Logout</Button>
      <br />
      <br />
    </Container>
  );
};
