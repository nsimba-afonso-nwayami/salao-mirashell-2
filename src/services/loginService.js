export async function loginUser({ username, senha }) {
  const response = await fetch("https://api2.nwayami.com/api/jwt-logar/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: senha,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Credenciais inválidas");
  }

  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  return data;
}
