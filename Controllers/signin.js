// const handleSignin = (req, res, db, bcrypt) => {
const handleSignin = (db, bcrypt) => (req, res) => { 
    const { email, password }  = req.body;
    if (!email || !password){
      return res.status(400).json('Please enter correct form details');
     }  
    db.select("email", "hash")
      .from("login")
      .where("email", "=", email)
      .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        console.log(password)
        console.log(isValid)
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then(user => {
              res.json(user[0]);
            })
            .catch(err => res.status(400).json("unable to get user"));
        }else{
          res.status(400).json("Wrong credentials")
        }
      })
      .catch(err => res.status(400).json("Wrong credentials"))
    }

    module.exports = {
        handleSignin: handleSignin
    }
  