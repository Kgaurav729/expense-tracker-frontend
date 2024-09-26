import React, {useEffect,useState} from 'react'
import api from '../services/Api'

const ExpenseList=({refresh,onEdit,onDelete,updatedExpense})=>{
    const [expenses, setExpenses]=useState([]);
    useEffect(()=>{
        fetchExpenses();
    },[refresh]);

    useEffect(()=>{
        if(updatedExpense){
            const updatedList=expenses.map(expense=>
                expense.id===updatedExpense.id ? updatedExpense :expense
            );
            setExpenses(updatedList);
        }
    },[updatedExpense]);
    const fetchExpenses=async()=>{
        try{
            const response =await api.get('/expenses/');
            setExpenses(response.data);
        }
        catch(error){
            console.error('Failed to fetch Expense',error)
        }
    };


    return(
        <div>
            <h2>Expense List</h2>
            <ul>
                {
                    expenses.map(expense=>(
                        <li key={expense.id}>
                            {expense.name}-${expense.amount}-{expense.category}-{expense.date}
                            <button onClick={()=>onEdit(expense)}>Edit</button>
                            <button onClick={()=>onDelete(expense.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );

};

export default ExpenseList;