import React,{useState,useEffect} from "react";
import api from "../services/Api";


const ExpenseForm=({onAddExpense,selectedExpense,setSelectedExpense})=>{
    const[name,setName]=useState('');
    const[amount,setAmount]=useState('');
    const[category,setCategory]=useState('');
    const[date,setDate]=useState('');


    useEffect(()=>{
        if(selectedExpense){
            setName(selectedExpense.name || '');
            setAmount(selectedExpense.amount || '');
            setCategory(selectedExpense.category || '');
            setDate(selectedExpense.date || '');
        }
        else{
            resetForm();
        }
    },[selectedExpense]);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        //preparing data only with updated fields
        //not sending unchanged fields

        const updatedFields={};
        if(name!=selectedExpense?.name) updatedFields.name=name;
        if(amount!=selectedExpense?.amount) updatedFields.amount=amount;
        if(category!=selectedExpense?.category) updatedFields.category=category;
        if(date!=selectedExpense?.date) updatedFields.date=date;

        // const expenseData={name,amount,category,date};
        try{
            let updatedExpense;
            if(selectedExpense){
                const response=await api.patch(`/expenses/${selectedExpense.id}/`,updatedFields);
                updatedExpense ={...selectedExpense,...updatedFields};

            }
            else{
                const response=await api.post('/expenses/',{name,amount,category,date});
                onAddExpense(response.data);
            }            
            onAddExpense(updatedExpense);
            resetForm();
        }catch(error){
            console.error('Failed to add Expense',error);
        }
    };

    const resetForm=()=>{
        setName('');
        setAmount('');
        setCategory('');
        setDate('');
        setSelectedExpense(null);

    }
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
            </div>
            <button type="submit">{selectedExpense? 'Update Expense':'Add Expense'}</button>
            {selectedExpense && <button type='button' onClick={resetForm}>Cancel</button>}

        </form>
    );
}

export default ExpenseForm;

