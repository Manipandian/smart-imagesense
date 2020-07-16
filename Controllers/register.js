


const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, passWord} = req.body;
    const hash = bcrypt.hashSync(passWord);
    if(!email || !name || !passWord) {
      return res.json('Please enter valid data');
    } 
    db.transaction(trx => {  // Trnasaction is used to create chained query and pass object you wich to create connection
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then( loginEmail => {
            return  trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}