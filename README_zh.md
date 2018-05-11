此文档用于部署一套DAG Pizza网络，包括生成配置文件、创建创世单元、开启Chef、Hub以及Explorer节点。相关代码已在Ubuntu及MacOS上测试通过。

主要步骤如下：

## 安装NodeJS及相关工具

安装NodeJS版本管理工具NVM：

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

检查NVM是否安装成功：

```bash
$ nvm -v
```

安装NodeJS v8.9.4 LTS版本：

```bash
$ nvm install 8.9.4
```

安装NodeJS进程管理工具：

```bash
$ npm install pm2 -g
```

安装NodeJS代码编译工具：

```bash
$ npm install node-gyp -g
```

## 下载相关代码

下载`dag-pizza-genesis`代码：

```bash
$ git checkout https://github.com/DAGBPA/dag-pizza-genesis
$ cd genesis
$ npm install
```

在目录`src`中下载`dag-pizza-chef`、`dag-pizza-explorer`及`dag-pizza-hub`代码：

```bash
$ cd src/
$ git checkout https://github.com/DAGBPA/dag-pizza-explorer
$ cd dag-pizza-explorer; npm install
$ git checkout https://github.com/DAGBPA/dag-pizza-hub
$ cd dag-pizza-hub; npm install
$ git checkout https://github.com/DAGBPA/dag-pizza-chef
$ cd dag-pizza-chef; npm install
```

## 生成配置文件

```bash
$ npm run init
```

生成的配置文件位于目录`wallets`中，目录结构为：

![](http://oc7urqs4c.bkt.clouddn.com/2018-04-01-byteball-genesis-wallets.png)

打印`chef`地址：

```bash
$ cat chef-address.json
```

修改`conf`目录下的`explorer-conf.js`和`hub-conf.js`，将上述地址填入`exports.initial_witnesses`。

## 创建创世单元

```bash
$ npm run create_pizza
```

运行后将会输出`Genesis unit: `及相应的创世单元hash值，然后终止运行。修改`conf`目录下的`constants.js`，将创世单元hash值填入`exports.GENESIS_UNIT`。

## 创建隐私资产

```bash
$ npm run create_noodles
```

运行后将输出`NOODLES asset created:`及相应hash值，终止运行。修改`conf`目录下的`constants.js`，将单元hash值填入`exports.NOODLES_ASSET`。

## 部署相关节点

```bash
$ npm run deploy
```

## 启动相关节点

```bash
$ npm run start
```

启动完成后，运行命令`pm2 list`，可得到如下结果

![](http://oc7urqs4c.bkt.clouddn.com/2018-04-01-byteball-genesis-pm2.png)

查看`Hub`节点日志，可看到相关节点已连接，比如`13 incoming connections, 0 outgoing connections, 0 outgoing connections being opened`。

```bash
$ pm2 logs hub
```

## 发布创世单元

```bash
$ npm run create_pizza
```

运行成功后，可以在`http://127.0.0.1:4000/`上查看创世单元。

## 发布隐私资产

```bash
$ npm run create_noodles
```

运行成功后，可以在`http://127.0.0.1:4000/`上查看隐私资产单元。


## 开启支付测试

```bash
$ npm run pay_pizza
```

开启支付测试，每30s发起一次支付（**注意：需要等待第1个单元到达稳定后开启**）。

## 支付隐私资产

```bash
$ npm run pay_noodles
```

注意需要有足够的`header_commission`和`witnessing`才可以开启支付。