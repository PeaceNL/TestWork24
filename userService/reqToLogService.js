const logger = async (id, operation) => {
    const url = 'http://localhost:4000/api/logService/logger';
    const data = {
    id, 
    operation 
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) // Преобразуем в формат JSON
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Response is not ok');
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = logger;