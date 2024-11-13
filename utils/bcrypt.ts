import BcryptReactNative from 'bcrypt-react-native';

const saltRounds = parseInt(process.env.EXPO_PUBLIC_SALT || '10', 10);

const createHash = async (password: string) => {
  try {
    console.log({saltRounds}, typeof saltRounds)
    const salt = await BcryptReactNative.getSalt(saltRounds);
    const hash = await BcryptReactNative.hash(salt, password);
    console.log('in Bcryptjs', hash);
    return hash;
  } catch (err) {
    console.log({ err });
  }
};
export { createHash };
