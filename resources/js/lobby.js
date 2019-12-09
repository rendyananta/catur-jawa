function waitForInvitations() {
    axios.get('/api/user').then(res => {
        Echo.private(`invitations.${res.data.data.id}`)
            .listen('InvitationCreated', e => {
                console.log(e)
            })
    });
}

function getUsers() {
    axios.get('/api/user/')
        .then(res => {
            console.log(res.data)
        })
}

function invite(user) {
    axios.post('/api/game', {
        invitee_id: user.id
    }).then(res => {
        invitationAccepted(res.data.data);
    })
}

function accept(match, acceptValue) {
    axios.patch(`/api/game/${match.id}/accept`, {
        accept: acceptValue
    }).then(res => {
        console.log(res.data)
    })
}

function invitationAccepted(match) {
    Echo.private(`invitation_status.${match.id}`)
        .listen('InvitationAccepted', e => {
            console.log(e)
        })
}

getUsers();
waitForInvitations();
