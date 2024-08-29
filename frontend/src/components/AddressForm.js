import InputBox from './InputBox';

function AddressForm({ 
    buildingName, setBuildingName, 
    houseNumber, setHouseNumber, 
    street, setStreet, 
    neighborhood, setNeighborhood, 
    city, setCity, 
    state, setState, 
    country, setCountry, 
    zipCode, setZipCode 
}) {
    return (
        <div>
            <InputBox type="text" label="Complemento" id="buildingName" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="Edifício Rui Barbosa" />
            <InputBox type="text" label="Número da Casa" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="123" required />
            <InputBox type="text" label="Rua" id="street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Av. Brasil" required />
            <InputBox type="text" label="Bairro" id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Centro" required />
            <InputBox type="text" label="Cidade" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="São Paulo" required />
            <InputBox type="text" label="Estado" id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="SP" required />
            <InputBox type="text" label="País" id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Brasil" required />
            <InputBox type="text" label="CEP" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="00000-000" required />
        </div>
    );
}

export default AddressForm;
