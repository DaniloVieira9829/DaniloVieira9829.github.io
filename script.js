document.addEventListener('DOMContentLoaded', function() {
    // Garante que o DOM está carregado antes de executar o código
    
    // Seus botões precisam ter os event listeners atribuídos
    // Adicione isso se seus botões não têm onclick no HTML
    document.getElementById('generateBtn').addEventListener('click', generateQRCode);
    document.getElementById('downloadBtn').addEventListener('click', downloadQRCode);
    document.getElementById('copyBtn').addEventListener('click', copyText);
});

function generateQRCode() {
    const inputText = document.getElementById('inputText').value;
    const qrcodeDiv = document.getElementById('qrcode');
    const messageDiv = document.getElementById('message');

    qrcodeDiv.innerHTML = '';
    messageDiv.innerText = '';

    if (!inputText) {
        messageDiv.innerText = 'Por favor, insira um link ou texto!';
        messageDiv.style.color = 'red';
        return;
    }

    try {
        new QRCode(qrcodeDiv, {
            text: inputText,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        messageDiv.innerText = 'QR Code gerado com sucesso!';
        messageDiv.style.color = 'green';
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        messageDiv.innerText = 'Erro ao gerar QR Code! Verifique o console.';
        messageDiv.style.color = 'red';
    }
}

function downloadQRCode() {
    const qrcodeDiv = document.getElementById('qrcode');
    const canvas = qrcodeDiv.querySelector('canvas');
    const messageDiv = document.getElementById('message');

    if (!canvas) {
        messageDiv.innerText = 'Gere um QR Code primeiro!';
        messageDiv.style.color = 'red';
        return;
    }

    try {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        messageDiv.innerText = 'QR Code baixado!';
        messageDiv.style.color = 'green';
    } catch (error) {
        console.error('Erro ao baixar QR Code:', error);
        messageDiv.innerText = 'Erro ao baixar QR Code!';
        messageDiv.style.color = 'red';
    }
}

function copyText() {
    const inputText = document.getElementById('inputText').value;
    const messageDiv = document.getElementById('message');

    if (!inputText) {
        messageDiv.innerText = 'Nenhum texto para copiar!';
        messageDiv.style.color = 'red';
        return;
    }

    navigator.clipboard.writeText(inputText).then(() => {
        messageDiv.innerText = 'Texto copiado para a área de transferência!';
        messageDiv.style.color = 'green';
    }).catch(() => {
        messageDiv.innerText = 'Erro ao copiar texto!';
        messageDiv.style.color = 'red';
    });
}
