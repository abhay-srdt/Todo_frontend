function base64UrlEncode(bytes) {
    return btoa(
        String.fromCharCode(...bytes)
    )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

export function generateCodeVerifier() {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    return base64UrlEncode(randomBytes);
}

export async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();

    const data = encoder.encode(codeVerifier);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return base64UrlEncode(
        new Uint8Array(hashBuffer)
    );
}