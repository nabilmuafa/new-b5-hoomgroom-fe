import { jwtVerify } from "jose";

export async function jwtIsValid(token) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, getSecret());
    return payload;
  } catch (err) {
    return false;
  }
}

export function extractDetails(token) {
  if (token) {
    const payload = token.split(".")[1];
    const details = JSON.parse(atob(payload));
    return {
      username: details.sub,
      role: details.role,
    };
  } else {
    return {
      username: "",
      role: "",
    };
  }
}

function getSecret() {
  const base64 = process.env.JWT_SECRET;
  const binaryString = Buffer.from(base64, "base64").toString("binary");
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
