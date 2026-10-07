// app/loading.tsx

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Carregando notícias...</h2>
    </div>
  );
}
