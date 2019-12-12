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
            if (e.match.accepted) {
                swal.fire({
                    title: 'Tantangan diterima'
                }).then(function () {
                    window.location.href = `${window.location.host}/game/${match.id}`
                });
            } else {
                swal.fire({
                    title: 'Tantangan ditolak'
                });
            }
        })
}

function waitForInvitations() {
    axios.get('/api/user').then(res => {
        Echo.private(`invitations.${res.data.data.id}`)
            .listen('InvitationCreated', e => {
                swal.fire({
                    title: 'Tantangan baru',
                    text: `Penantang : ${e.match.inviter.name}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Terima tantangan',
                    cancelButtonText: 'Tolak',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        accept(e.match, 1);
                        window.location.href = `${window.location.host}/game/${e.match.id}`;
                    } else if (result.dismiss === swal.DismissReason.cancel) {
                        accept(e.match, 0)
                    } else {
                        accept(e.match, 0)
                    }
                })
            })
    });
}

function getUsers() {
    axios.get('/api/users/')
        .then(res => {
            createRow(res.data.data)
        })
}

function createRow(users) {
    let body = document.getElementById('table-body');
    body.innerHTML = '';

    users.forEach(function (user, index) {
        let tr = document.createElement('tr');

        tr.innerHTML = `<td>${index + 1}</td>` +
            `<td>${user.name}</td>` +
            `<td><button class='button is-danger is-small' id="invitation-${user.id}" data-invitation-id="${user.id}">Tantang</button></td>`;

        body.append(tr);

        let btn = document.getElementById(`invitation-${user.id}`);
        btn.addEventListener('click', function () {
            axios.post('/api/game', {
                invitee_id: user.id
            }).then(res => {
                invitationAccepted(res.data.data);
            })
        });
    });
}

getUsers();
waitForInvitations();

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', function () {
    getUsers()
});
