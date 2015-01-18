var Master = function(conf) { 
	conf = conf || {};
	this.cluster = conf.cluster;
}

Master.prototype.createWorker = function() {
	var worker = this.cluster.fork();
	console.log('worker : ' + worker.id + ' start');
};

Master.prototype.onWorkerExit = function() {
	var self = this;
	setTimeout(function(){
		self.createWorker();
	},500);
};

module.exports = Master;