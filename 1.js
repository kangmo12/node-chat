// 모듈 추출
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버 생성
var server = http.createServer(function(request,response){
    // html 파일읽기
    fs.readFile('1.html',function(error,data){
        response.writeHead(200,{'Content-type' : 'text/html'});
        response.end(data);
        
    });
    
}).listen(3000,function(){
    console.log('start');
});

// 소켓 서버 생성 및 실행
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    socket.on('SendChat', function(data){
        socket.join(data.Room); 
        //hchat값이 같으면 조인시키고 chatResult값을 emit 시킨다.
        io.to(data.Room).emit('ChatResult',data);
        
    })
    socket.on('disconnection',function(socket){
        socket.leave("연결종료");
    })
    
});