/*=============== TEAM MEMBERS LOGIC ===============*/

// Function to fetch and display team members
async function displayTeam() {
    const teamContainer = document.getElementById('team-grid');
    const STRAPI_URL = 'http://localhost:1337';

    try {
        // 1. Fetch data from Strapi (populate=* is required to get the image)
        const response = await fetch(`${STRAPI_URL}/api/team-members?populate=*`);
        const result = await response.json();
        
        // Strapi 5 returns an array in result.data
        const members = result.data;

        // 2. Clear the container (in case of re-renders)
        teamContainer.innerHTML = '';

        // 3. Loop through each member
        members.forEach(member => {
            const attr = member.Profielfoto;
            console.log(attr);

            
            
            
            // Get the image URL safely
            // Profielfoto might be null, so we provide a fallback
            const imgUrl = member.Profielfoto 
                ? `${STRAPI_URL}${member.Profielfoto.url}` 
                : 'https://via.placeholder.com/150';

            // 4. Create the HTML for the card
            const card = `
                <div class="team-card">
                    <img src="${imgUrl}" alt="${member.Naam}" class="member-photo">
                    <h3>${member.Naam}</h3>
                    <p class="role">${member.Functie}</p>
                    <span class="domain">${member.Domein}</span>
                </div>
            `;

            // 5. Add it to the page
            teamContainer.innerHTML += card;
        });

    } catch (error) {
        console.error('Fout bij het ophalen van het team:', error);
        teamContainer.innerHTML = '<p>Kon het team niet laden.</p>';
    }
}

// Start the function
displayTeam();