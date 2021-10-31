import twilio, { Twilio } from 'twilio';

import { APP } from '../utils/constants';

/**
 * TODO: (6.01):
 * - Add your twilio account id, auth token, and phone number to your
 * .env.development file.
 */
export const client: Twilio = twilio(
  APP.TWILIO_ACCOUNT_SID,
  APP.TWILIO_AUTH_TOKEN
);

type SendTextArgs = {
  message: string;
  to: string;
};

/**
 * Sends a text message to the given recipient with the given message. Returns
 * true if the message was sent successfully, and false if there was an
 * error.
 *
 * If the environment is not production, this function does nothing and returns
 * true.
 *
 * @param args.message - Text content to send in message.
 * @param args.to - Phone number to send the message to.
 */
const sendText = async ({ message, to }: SendTextArgs): Promise<boolean> => {
  // Don't send texts unless it is production environment. If you want texts
  // to send while in development, simply comment out this line.
  if (!APP.IS_PRODUCTION) return true;

  try {
    // Send the text
    await client.messages.create({
      body: message,
      from: APP.TWILIO_PHONE_NUMBER,
      to
    });
  } catch (e) {
    return false;
    // What should be return if sending the text was unsuccessful?
  }

  return true;
};

const TextService = {
  sendText
};

export default TextService;
