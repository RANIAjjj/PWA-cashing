self.addEventListener('install',(event)=>{
console.log('install stage in service worker is installed');
self.skipWaiting()
event.waitUntil(    
    caches.open('myJsApp').then((caches)=>{
    return caches.addAll(['login.html',
    'login.css' ,
    'login.js',]).catch((err)=>{
        console.log(err);
    })
   }))
}
)

self.addEventListener('activate',(event)=>{
    console.log('activate is working');
})

self.addEventListener('fetch',(event)=>{
console.log(event.request.url);
event.respondWith(
    caches.match(event.request).then((file)=>{
        if(file)
        {
            console.log(`files are exested : ${file}`);
            return file
        }else{
            return fetch(event.request.url)
        }
    }).catch(err=>console.log(err))
)
})