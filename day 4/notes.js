// // //cookie
// // A cookie is just a small key–value string the server asks the browser to store and automatically send back on matching requests.

// // Set by server via Set-Cookie header; sent by browser in Cookie header.

// // Size: ~4 KB per cookie; browsers cap the number per domain.

// // Common attributes:
// // HttpOnly (JS can’t read—mitigates XSS data theft),
// // Secure (HTTPS only),
// // SameSite=Lax|Strict|None (CSRF protection/leeway),
// // Path, Domain, Max-Age/Expires.
// // keep a session id, remember preferences, AB-test buckets, etc.

// // Cookies are transport—not “sessions” by themselves. You can put almost anything in a cookie (though you shouldn’t store secrets), or you can use it merely to carry a random session id.

// // //session
// // A session is server-tracked state associated with a visitor (e.g., which user is logged in). The session is usually identified by a random session id (sid) stored in a cookie. On the server you keep a record keyed by that sid containing user data.

// // Server-side store: memory (dev only), Redis/Memcached, database, etc.

// // Lifecycle: created on login, expires/invalidates on logout or timeout.

// // Security: regenerate sid after login to prevent session fixation; set secure cookie flags; rotate secrets; limit idle lifetime.

// // In Node/Express, the express-session middleware does exactly this: it writes a signed cookie containing only the sid (not the user data) and keeps the data in your store


// // //Key differences (cookie vs session)
// // Aspect	           Cookie	Session (with cookie sid)
// // Where data lives	Browser	Server (store keyed by sid)
// // Size limit	~      4 KB	As large as your store allows
// // Confidentiality	Visible to user/devtools (unless encrypted separately)	Hidden on server
// // Integrity	Can be signed to detect tampering	Server controls truth; sid can be signed
// // Revocation	Delete cookie; but if it carried data, you can’t “pull it back”	Kill the record in store = immediate logout
// // CSRF exposure	Cookies auto-send → CSRF risk unless mitigated	Same risk because the sid cookie auto-sends
// // Scaling	No server state needed if you embed all data in cookie (not typical)	Requires shared store (e.g., Redis) for multiple servers
// // Performance	No server lookup if you encode state in cookie	Requires store I/O per request (unless cached)

// // There’s also a middle path in Node—cookie-session—that stores the entire (usually small) session object in a signed (optionally encrypted) cookie. That’s “stateful in the client,” and has its own trade-offs (size, rotation, revocation).


// Example: Hotel Check-in

// Imagine you’re checking into a hotel.

// Stateful authentication (Sessions)

// You check in → the receptionist creates a record in their system:

// Guest #12345 → Room 101, breakfast included


// They give you a key card (just an ID number, e.g. 12345).

// Every time you want room service, you swipe the card.
// The hotel system looks up your record: “Oh, Guest #12345, yes, you get breakfast.”

// * The state (your data) is stored in the hotel’s computer (server).
// * Your key card only identifies you (doesn’t carry all your info).
// * If the hotel deletes your record, your key card becomes useless immediately (easy logout).

// This is how sessions work (express-session):

// Server keeps the state (session object).

// Browser just stores a small ID in a cookie.


// Stateless authentication (JWT)

// You check in → instead of saving anything, the receptionist hands you a sealed envelope that contains:

// Name: Alice
// Room: 101
// Breakfast: Yes
// Exp: 10 PM


// And the envelope is stamped with the hotel’s special seal (digital signature).

// Every time you want room service, you show the envelope.
// The staff just checks the seal → if it’s valid and not expired, you get service.

// The hotel doesn’t need to look you up in their system; the envelope itself proves everything.

//  The state (your info) is stored inside the token (envelope).
//  Server only verifies the signature (stamp), no database lookup needed.
//  Problem: if you lose your envelope or it’s stolen, it’s valid until it expires → the hotel can’t cancel it easily (harder logout).

// this is how JWT (stateless) works:

// All info is in the token.

// Server doesn’t need memory/database to track you.


// 1) Cookie (Top Part)

// Client ↔ Server

// The client (browser) sends a request to the server.

// The server sends back a cookie and tells the browser to store it.

// Every future request automatically includes that cookie.

// Cookies are just data stored in the browser (not inherently about authentication).

// 2) Session (Middle Part)

// Client ↔ Server + Session Store

// When you log in, the server creates a session record in its database (the “Session Store”).

// It gives your browser a small session id (sid) stored in a cookie.

// Each request → browser sends the sid → server looks up your session data from the Session Store.

// This is stateful because the server keeps memory (state) of your session.

// 3) JWT (Bottom Part)

// Client ↔ Server (no session store needed).

// On login, the server gives the client a JWT token that already contains user info (id, role, expiry) + a signature.

// Client stores this token (in localStorage, memory, or cookie).

// Each request includes the token.

// The server only verifies the token (checks signature + expiry) — no lookup in a session store.

// This is stateless because the server doesn’t need to remember you; all info is inside the token.

//  So the diagram shows:

// Cookie: data stored on client.

// Session: client holds sid, server remembers the session state.

// JWT: client holds the full token, server just verifies it without storing state.