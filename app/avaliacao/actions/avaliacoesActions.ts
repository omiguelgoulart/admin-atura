export async function getAvaliacoes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin/avaliacoes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao carregar");
    return await res.json();
  } catch {
    return [];
  }
}

export async function deletarAvaliacao(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin/avaliacoes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}
