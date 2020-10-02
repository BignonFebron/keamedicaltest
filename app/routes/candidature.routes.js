module.exports = (app) => {
    const postectrl = require('../controllers/posteController.js');
    const candidatctrl = require('../controllers/candidatController.js');
    const ctrl = require('../controllers/candidatureController.js');

    app.get('/poste/list',postectrl.getAllPostes);
    app.post('/poste/create/many', postectrl.createManyPosts);
    app.post('/candidat/create',candidatctrl.createCandidateAccount);
    app.delete('/candidat/delete/:userId',candidatctrl.deleteCandidat);
    app.post('/login',candidatctrl.login);
    app.post('/candidature/create',ctrl.createNewCandidateure);
    app.get('/candidat/list',ctrl.getByPoste);
}