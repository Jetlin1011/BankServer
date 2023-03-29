const jwt=require("jsonwebtoken")

userDetails = {
  1000: { username: "jetlin", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1001: { username: "jeswin", acno: 1001, password: "abc123", balance: 0, transaction: [] },
  1002: { username: "mini", acno: 1002, password: "abc123", balance: 0, transaction: [] },
  1003: { username: "poulose", acno: 1003, password: "abc123", balance: 0, transaction: [] },
  1004: { username: "tanjiro", acno: 1004, password: "abc123", balance: 0, transaction: [] }

}

register = (acno, uname, pass) => {
  if (acno in userDetails) {
    return {
      status: false,
      msg: "User alredy exists.",
      statusCode: 404
    }
  }
  else {
    userDetails[acno] = { username: uname, acno, password: pass, balance: 0, transaction: [] }
    return {
      status: true,
      msg: "New user added succesfully.",
      statusCode: 200
    }

  }

}


login = (acno2, pass2) => {
  if (acno2 in userDetails) {
    if (pass2 == userDetails[acno2].password) {
      user = userDetails[acno2].username
      accountnumber = acno2
        //token create
const token=jwt.sign({accountnumber},"mykey")

      return {
        status: true,
        msg: "login success",
        statusCode: 200,
        user: user,
        accountnumber: accountnumber,
        //since key and value of token is same 
        token
      }
    }
    else {
      return {
        status: false,
        msg: "Incorrect password.",
        statusCode: 404
      }

    }
  }
  else {
    return {
      status: false,
      msg: "Incorrect account number.",
      statusCode: 404
    }

  }
}


deposit = (acno, pass, amt) => {
  var amount = parseInt(amt)
  if (acno in userDetails) {
    if (pass == userDetails[acno].password) {
      userDetails[acno].balance += amount;
      userDetails[acno].transaction.push({ Type: "credit", Amount: amount })

      return {
        status: true,
        msg: `You're account has been credited rupees ${amount} and current balance is ${userDetails[acno].balance}`,
        statusCode: 200
      }
    }
    else {
      return{
      status: false,
        msg: "incorrect password",
          statusCode: 404
    }
  }
}

  else {
    return {
      status: false,
      msg: "incorrect account number",
      statusCode: 404
    }
  }
}


withdraw=(acno,pass,amt)=>{
  var amount=parseInt(amt)
  if(acno in userDetails){
if(pass==userDetails[acno].password){
if(amount<=userDetails[acno].balance){
userDetails[acno].balance-=amount
userDetails[acno].transaction.push({Type:"debit",Amount:amount})
return {
  status: true,
  msg: `You're account has been debited rupees ${amount} and current balance is ${userDetails[acno].balance}`,
  statusCode: 200
}
}
else {
 return {
  status: false,
  msg:"You're account has insuffcient funds",
  statusCode: 404
}
}
}else{
  return  {
    status: false,
    msg:"incorrect password.",
    statusCode: 404
  }
}
  }
  else{
    return  {
      status: false,
      msg:"incorrect account number",
      statusCode: 404
    }
  }
}

getTransactions=(acno)=>{
  return {
      status:true,
      transactionArray:userDetails[acno].transaction,
      statusCode:200
  }
 }

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransactions
}