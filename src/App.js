import React ,{useEffect,useState} from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import api from "./services/Api";
import './App.css';

const App=()=>{
    // const [expenses,setExpenses]=useState([]);

    const [refresh,setRefresh]=useState(false);
    const [selectedExpense,setSelectedExpense]=useState(null);
    const [updatedExpense,setUpdatedExpense]=useState(null);


    const handleAddExpense=(expense)=>{
      // setExpenses([...expenses,newExpense]);
      setUpdatedExpense(expense);
      setRefresh(!refresh);
      // setRefresh(prev => !prev);
    };

    const handleEditExpense=(expense)=>{
      setSelectedExpense(expense);
    }
    
    const handleDeleteExpense=async(id)=>{
      try{
        await api.delete(`/expenses/${id}/`);
        // setRefresh(prev => !prev);
        setRefresh(!refresh);
      }catch(error){
        console.error('Failed to Delete Error',error);
      }
    };
    return(
      <div>
        <h1>Expense Tracker</h1>
        <ExpenseForm 
          onAddExpense={handleAddExpense}
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
        />
        {/* <ExpenseList expenses={expenses}/> */}
        <ExpenseList 
          refresh={refresh}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
          updatedExpense={updatedExpense}
        />
      </div>
    );
};

export default App;