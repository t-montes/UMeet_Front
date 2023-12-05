function TextField({ value, onChange }) {
  return (
    <form>
      <input
        type="text"
        value={value || ''} // Utiliza el valor proporcionado o una cadena vacía
        onChange={onChange}
      />
      <br />
    </form>
  );
}

export default TextField;
