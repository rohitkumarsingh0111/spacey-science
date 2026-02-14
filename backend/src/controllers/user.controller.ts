import { Request, Response } from 'express';
import User from '../models/User';

export const authUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'Name and email are required' 
      });
    }

    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ name, email });
      await user.save();
      console.log(`New user created: ${email}`);
    } else {
      console.log(`Existing user logged in: ${email}`);
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Authentication failed' 
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch user' 
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Prevent updating sensitive fields
    delete updates._id;
    delete updates.email;
    delete updates.totalScore;
    delete updates.badges;
    
    const user = await User.findByIdAndUpdate(
      id, 
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to update user' 
    });
  }
};