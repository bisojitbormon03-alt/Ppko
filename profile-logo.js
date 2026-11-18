
/* ============================================================
   Profile Logo Module

   File:
   js/home/profile-logo.js

   Responsibilities:

   1. Generate profile avatar.
   2. Load profile photo.
   3. Handle profile image errors.
   4. Generate name + color based avatar.
   5. Update the Header Profile Logo.

   Firebase Authentication is managed by index.html.
   Firestore listener is managed by index.html.

   No localStorage.
   No sessionStorage.
   No email usage.
   ============================================================ */


// ============================================================
// Get name initial
//
// Email is never used.
// ============================================================

function getNameInitial(nameValue) {

    if (
        !nameValue ||
        typeof nameValue !== "string"
    ) {

        return "?";
    }


    const cleanName =
        nameValue.trim();


    if (!cleanName) {

        return "?";
    }


    return cleanName
        .charAt(0)
        .toUpperCase();
}


// ============================================================
// SVG Data URI
// ============================================================

function svgToDataUri(svgString) {

    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
            svgString
        )
    );
}


// ============================================================
// Generate avatar
//
// Uses:
//
// 1. User name
// 2. User color
//
// Default color: #2C4E76
// ============================================================

function generateAvatarDataUri(
    nameValue,
    colorValue
) {

    const letter =
        getNameInitial(
            nameValue
        );


    const safeColor =
        (
            colorValue &&
            typeof colorValue === "string" &&
            colorValue.trim().length > 0
        )
            ? colorValue.trim()
            : "#2C4E76";


    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        'width="120" height="120" viewBox="0 0 120 120">' +

            '<rect ' +
                'width="120" ' +
                'height="120" ' +
                'rx="60" ' +
                'fill="' +
                    safeColor +
                '"' +
            '/>' +

            '<text ' +
                'x="60" ' +
                'y="60" ' +
                'text-anchor="middle" ' +
                'dominant-baseline="central" ' +
                'font-family="Arial, sans-serif" ' +
                'font-size="58" ' +
                'font-weight="600" ' +
                'fill="#ffffff"' +
            '>' +

                letter +

            '</text>' +

        '</svg>';


    return svgToDataUri(
        svg
    );
}


// ============================================================
// Update Profile Button
//
// Priority:
//
// 1. Profile photo
// 2. Generated name + color avatar
//
// If profile photo fails to load,
// generated avatar is displayed.
// ============================================================

function updateProfileButton(
    profileData
) {

    const headerProfileBtn =
        document.getElementById(
            "headerProfileBtn"
        );


    if (!headerProfileBtn) {
        return;
    }


    profileData =
        profileData || {};


    const name =
        (
            typeof profileData.name === "string"
        )
            ? profileData.name.trim()
            : "";


    const photo =
        (
            typeof profileData.photo === "string"
        )
            ? profileData.photo.trim()
            : "";


    const color =
        (
            typeof profileData.color === "string"
        )
            ? profileData.color.trim()
            : "";


    // --------------------------------------------------------
    // Generate fallback avatar
    // --------------------------------------------------------

    const generatedSrc =
        generateAvatarDataUri(
            name,
            color
        );


    // --------------------------------------------------------
    // Show generated avatar
    // --------------------------------------------------------

    function showGeneratedAvatar() {

        const img =
            document.createElement(
                "img"
            );


        img.src =
            generatedSrc;

        img.alt =
            "Profile";

        img.draggable =
            false;

        img.className =
            "profile-avatar-btn";


        headerProfileBtn
            .replaceChildren(
                img
            );
    }


    // --------------------------------------------------------
    // Profile photo available
    // --------------------------------------------------------

    if (
        photo &&
        typeof photo === "string" &&
        photo.trim() !== ""
    ) {

        const photoImg =
            document.createElement(
                "img"
            );


        photoImg.src =
            photo;

        photoImg.alt =
            "Profile";

        photoImg.draggable =
            false;

        photoImg.className =
            "profile-avatar-btn";


        // ----------------------------------------------------
        // Profile image error fallback
        // ----------------------------------------------------

        photoImg.addEventListener(
            "error",
            function () {

                showGeneratedAvatar();

            },
            {
                once: true
            }
        );


        headerProfileBtn
            .replaceChildren(
                photoImg
            );

    } else {

        // ----------------------------------------------------
        // No profile photo
        //
        // Display generated avatar.
        // ----------------------------------------------------

        showGeneratedAvatar();
    }
}


// ============================================================
// Public Profile Avatar Update Function
//
// Imported by index.html:
//
// import {
//     updateProfileAvatar
// } from "./js/home/profile-logo.js";
//
// Example:
//
// updateProfileAvatar({
//     name: "John",
//     photo: "https://example.com/photo.jpg",
//     color: "#2C4E76"
// });
//
// Logout / reset:
//
// updateProfileAvatar({
//     name: "",
//     photo: "",
//     color: ""
// });
// ============================================================

export function updateProfileAvatar({
    name = "",
    photo = "",
    color = ""
} = {}) {

    updateProfileButton({

        name: name,

        photo: photo,

        color: color

    });
}
