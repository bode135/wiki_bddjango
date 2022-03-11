FROM bode135/bd_ssh_py36

# 这里注意是容器里的dir_name.
ENV dir_name="/server"

# 系统语言设置为中文
ENV LANG C.UTF-8

RUN if [ ! -d "$dir_name" ]; then mkdir $dir_name; fi
WORKDIR $dir_name
COPY .  $dir_name

RUN apt-get update --assume-yes
RUN apt-get install lsof --assume-yes
RUN apt-get install vim --assume-yes
RUN apt-get install git --assume-yes

RUN python -m pip install --upgrade pip
RUN pip install -i https://mirrors.aliyun.com/pypi/simple/ -r requirements.txt

EXPOSE 80 22 8000
CMD ["/bin/sh"]

