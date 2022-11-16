const express= require('express')
const budget= require('./models/budget')
const app= express()
const port= 3000
app.use(express.urlencoded({extended:false})) 
app.use(express.static('public')) 
app.listen (port,()=>{
    console.log ('server is running')
})

// request is the info that the user gives to thew API and response is what API gives to the user
app.get ('/',(req,res)=>{
    res.send('Welcome to the budget App!');
})

app.get ('/budgets',(req,res)=>{
    let bankAccount=0
    for (let index = 0; index < budget.length; index++) {
        const element = budget[index];
        bankAccount+=element.amount
    }
    res.render('index.ejs',{budget,bankAccount}); //  to show the index view in the budget route//
})
    
}
// doesnt conflict with the index route, thats why New will come first
app.get ('/budgets/new',(req,res)=>{
    res.render('new.ejs');
})

app.get ('/budgets/:index',(req,res)=>{
    const index= req.params.index
    res.render('show.ejs',{budget:budget[index]});
})

app.post ('/budgets',(req,res)=>{
   console.log(req.body)
   budget.push(req.body)
   res.redirect('/budgets')
})


