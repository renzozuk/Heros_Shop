import InputBox from './InputBox';

function UserForm({ 
    name, setName, 
    email, setEmail, 
    cpf, setCpf, 
    phoneNumber, setPhoneNumber, 
    photo, setPhoto, 
    password, setPassword, 
    newPassword, setNewPassword, 
    confirmPassword, setConfirmPassword 
}) {
    return (
        <div>
            <InputBox type="text" label="Nome Completo" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Fulano de Tal" required />
            <InputBox type="text" label="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="fulano@email.com" required />
            <InputBox type="password" label="Nova senha" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="********" />
            <InputBox type="password" label="Confirmar senha" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" />
            <InputBox type="text" label="CPF" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="00.000.000-00" required />
            <InputBox type="text" label="Telefone" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+55 (**) *****-****" required />
            <InputBox type="text" label="Link da foto" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://example.com/photo.jpg" />
        </div>
    );
}

export default UserForm;
