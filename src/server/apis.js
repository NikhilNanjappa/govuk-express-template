const getAddress = async (req, res, next) => {
  try {
    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
};

export {
  getAddress,
};
