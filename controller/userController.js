import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import sendEmail from '../sendEmail.js';

const forSignup = async (req, res) => {
    try {
        let { firstname, lastname, email, password, role } = req.body;

        if (!firstname || !lastname || !email || !password) {
            res.status(500).json({message:"All fields are required!"})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists, Please Login" });
        }

        let hasshedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          firstname,
          lastname,
          email,
          password: hasshedPassword,
        });

        const welcomeMail = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
            <h1 style="text-align:center">Welcome to Our Platform <img src="https://pngdownload.io/wp-content/uploads/2025/04/Arsenal-FC-Logo-Premier-League-Football-Club.webp" width="70px" /></h1>
            <p>Dear ${firstname} ${lastname},</p>\n\n
            <p> Welcome to our platform! We're excited to have you on board.\n\n</p>
            <ol>
                <li>Explore our features and services.</li>
                <li>Stay updated with our latest news.</li>
                <li>Feel free to reach out if you have any questions.</li>
            </ol>
            <p>Best regards \n\n</p>
            <p style="font-weight:bold">Your Company Team</p>
            <p>Contact us at: <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a></p>
</div>
        `;
        await sendEmail(email, "Welcome to Our Platform", welcomeMail);

        res.status(200).json({ message: "Sign up successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(error)
    }
    

}

const forLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const checkUser = await User.findOne({ email })
        if (!checkUser) return res.status(404).json({ message: "User not found" });

        let passwordMatch = await bcrypt.compare(password, checkUser.password);
        if (!passwordMatch) return res.status(400).json({ message: "invalid password" })
        
        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role },
            process.env.SECRET_KEY,
            { expiresIn: '3h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful"});

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const getAllUsers = async (req, res) => {
    const myUsers = await User.find()

    if (!myUsers) { 
        return res.status(404).json({ message: "No users found" });  
    }

    res.status(200).json(myUsers)
}     

const get1user = async (req, res) => {
    let { id } = req.params;
    const oneUser = await User.findById(id);

    if (!oneUser) return res.status(404).json({ message: "User not found" });

    res.status(200).send(oneUser)
}

const del1User = async (req, res) => {
    let { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
}

const update1User = async (req, res) => {
    let { id } = req.params;

    let newData = req.body;

    let updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully" });
}



export {
    getAllUsers,
    get1user, 
    del1User,
    update1User,
    forSignup,
    forLogin
}