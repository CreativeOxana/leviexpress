export const CityOptions = (props) => {
  return (
    <select
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      <option value="">Vyberte</option>
      {props.cities &&
        props.cities.map((city) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
    </select>
  );
};
