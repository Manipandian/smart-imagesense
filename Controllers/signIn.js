

const handleSignIn = (req, res, db, bcrypt) => {
    const {email, passWord} = req.body;
    if(!email || !passWord) {
        return res.json('Please enter valid data');
      } 
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
         const isValid = bcrypt.compareSync(passWord, data[0].hash);
             if (isValid) {
                 return db.select('*').from('users')
                 .where('email', '=', email)
                 .then(data => {
                         res.json(data[0]);
                     }
                 )
                 .catch(err => res.status(400).json('unable to get user'))
             } else {
                 res.status(400).json('wrong credential');
             }
     })
     .catch(err => res.status(400).json('Please enter correct email and password'))
 }

 module.exports = {
     handleSignIn: handleSignIn
 }