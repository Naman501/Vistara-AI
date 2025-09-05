const CoverLetter = async ({ params }) => {
  const { id } = await params; // 👈 await here
  return <div>CoverLetter : {id}</div>;
};

export default CoverLetter;
