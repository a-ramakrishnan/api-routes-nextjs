function handler(request, response) {
    response.status(401).json({
        message: 'You are not authorized to view this Page'
    })
}

export default handler;
