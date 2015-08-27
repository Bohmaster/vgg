module.exports = function(Mail) {

  Mail.sendMail = function(data, cb) {

    Mail.app.models.Email.send({

      to: 'voidhmaster@gmail.com',
      from: 'tato@guiacomercialvgg.com.ar',
      subject: 'my subject',
      text: data.text,
      html: 'my <em>html</em>' + data.text

    }, function(err, mail) {

      if (err) {
        cb(err);
      }

      console.log(data.text);
      cb(null, 'Mail enviado!');

    });

  };

  Mail.remoteMethod(
    'sendMail',
    {
      accepts: {
        arg: 'data',
        type: 'object'
      },
      returns: {arg: 'message', type: 'string'}
    }
  );

};
