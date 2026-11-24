import Gig from '../models/Gig.js';

export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ date: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Could not load gigs' });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(gig);
  } catch (error) {
    res.status(400).json({ message: 'Invalid gig id' });
  }
};

export const createGig = async (req, res) => {
  try {
    const newGig = await Gig.create(req.body);
    res.status(201).json(newGig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGig = async (req, res) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedGig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(updatedGig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const deletedGig = await Gig.findByIdAndDelete(req.params.id);
    if (!deletedGig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid gig id' });
  }
};
