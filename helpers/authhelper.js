import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRound = 5;
    const hashed = await bcrypt.hash(password, saltRound);
    return hashed;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
