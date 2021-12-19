exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Nomi kiritilishi kerak').notEmpty();
  req
    .check('email', 'Elektron pochta uzunligi 3 dan 30gacha bo\'lishi kerak')
    .matches(/.+\@.+\..+/)
    .withMessage('Emailda @ belgisi bo\'lishi kerak')
    .isLength({
      min: 4,
      max: 32,
    });
  req.check('password', 'Parol kiritilishi kerak').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Parol eng kamida 6ta belgi bo\'lishi kerak')
    .matches(/\d/)
    .withMessage('Parolda son qatnashishi kerak');
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
