<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">按项目查询</h2>
    <div>
      <!-- 筛选条件 -->
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年级：</span>
              <Select v-model="grade" style="width: 120px">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.gradeId"
                  :key="item.gradeId"
                  >{{ item.val }}</Option
                >
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>性别：</span>
              <Select v-model="gender" style="width: 120px">
                <Option
                  v-for="item in genderList"
                  :value="item.itemId"
                  :key="item.itemId"
                  >{{ item.itemName }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
          </div>
        </div>
      </Card>
      <Card style="margin-top:16px;">
        <Tabs type="card" @on-click="selectTabs" v-model="tittleTabs">
          <TabPane
            v-model="schoolTestId"
            :name="testitem.schoolTestId + ''"
            :label="testitem.schoolTestName"
            v-for="(testitem, index) in testList"
            :key="testitem.schoolTestId"
            :value="testitem.schoolTestId"
            :index="index + 1"
            style="height:768px;overflow-y:scroll;"
          >
            <div v-if="testitem.schoolTestId == 1">
              <div>
                <Card>
                  <div style="font-size: 18px; height: 40px">数据总览</div>
                  <Row>
                    <div>
                      <Table
                        border
                        :loading="loading"
                        :columns="highResultColumns"
                        :data="resultData"
                      ></Table>
                    </div>
                  </Row>
                </Card>
              </div>
              <div style="margin-top: 20px">
                <Card>
                  <div style="font-size: 18px; height: 40px">数据明细</div>
                  <Row>
                    <div>
                      <Table
                        border
                        max-height="400"
                        :loading="loading"
                        :columns="highOverViewColumns"
                        :data="overViewData"
                      ></Table>
                    </div>
                  </Row>
                </Card>
              </div>
              <div :style="{ marginTop: '20px' }">
                <Card>
                  <div style="font-size: 20px; height: 40px">数据分析</div>
                  <div :style="{ backgroundColor: '#FFFFFF' }">
                    <Row :style="{ textAlign: 'center' }">
                      <div
                        id="myChartHeight"
                        :style="{
                          width: '40%',
                          height: '400px',
                          marginTop: '50px',
                          display: 'inline-block',
                        }"
                      ></div>
                    </Row>
                  </div>
                </Card>
              </div>
              <div :style="{ marginTop: '20px' }">
                <Card>
                  <div style="font-size: 20px; height: 40px">平均身高</div>
                  <div
                    id="myChartHeight1"
                    :style="{ width: '1500px', height: '400px' }"
                  ></div>
                </Card>
              </div>
            </div>
            <div v-else-if="testitem.schoolTestId == 12">
              <div>
                <Card>
                  <div style="font-size: 18px; height: 40px">数据总览</div>
                  <Row>
                    <div>
                      <Table
                        border
                        :loading="loading"
                        :columns="weightResultColumns"
                        :data="resultData"
                      ></Table>
                    </div>
                  </Row>
                </Card>
              </div>
              <div style="margin-top: 20px">
                <Card>
                  <div style="font-size: 18px; height: 40px">数据明细</div>
                  <Row>
                    <div style>
                      <Table
                        border
                        max-height="400"
                        :loading="loading"
                        :columns="weightOverViewColumns"
                        :data="overViewData"
                      ></Table>
                    </div>
                    <br />
                  </Row>
                </Card>
              </div>
              <div :style="{ marginTop: '20px' }">
                <Card>
                  <div style="font-size: 20px; height: 40px">数据分析</div>
                  <div :style="{ backgroundColor: '#FFFFFF' }">
                    <Row :style="{ textAlign: 'center' }">
                      <div
                        id="myChartWeight"
                        :style="{
                          width: '40%',
                          height: '400px',
                          marginTop: '50px',
                          display: 'inline-block',
                        }"
                      ></div>
                    </Row>
                  </div>
                </Card>
              </div>
              <div :style="{ marginTop: '20px' }">
                <Card>
                  <div style="font-size: 20px; height: 40px">平均体重</div>
                  <div
                    id="myChartWeight1"
                    :style="{ width: '1500px', height: '400px' }"
                  ></div>
                </Card>
              </div>
            </div>
            <div v-else-if="testitem.schoolTestId == 10000">
              <div>
                <Card>
                  <div style="font-size: 18px; height: 40px">数据总览</div>
                  <Row>
                    <div>
                      <Table
                        border
                        :loading="loading"
                        :columns="resultColumnsBMI"
                        :data="resultDataBMI"
                      ></Table>
                    </div>
                  </Row>
                </Card>
              </div>
              <div style="margin-top: 20px">
                <Card>
                  <div style="font-size: 18px; height: 40px">数据明细</div>
                  <Row>
                    <div style>
                      <Table
                        border
                        max-height="400"
                        :loading="loading"
                        :columns="resultColumnsBMIDetail"
                        :data="resultDataBMIDetail"
                      ></Table>
                    </div>
                    <br />
                  </Row>
                </Card>
              </div>
              <div v-if="testitem.schoolTestId == 10000">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="bmiChart1"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="bmiChart2"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均BMI</div>
                    <div
                      id="bmiChart3"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="bmiChart4"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">肥胖率</div>
                    <div
                      id="bmiChart5"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
            </div>
            <div v-else>
              <div>
                <Card>
                  <div style="font-size: 18px; height: 40px">数据总览</div>
                  <Row>
                    <div>
                      <Table
                        border
                        :loading="loading"
                        :columns="resultColumns"
                        :data="resultData"
                      ></Table>
                    </div>
                  </Row>
                </Card>
              </div>
              <div style="margin-top: 20px">
                <Card>
                  <div style="font-size: 18px; height: 40px">数据明细</div>
                  <Row>
                    <div style>
                      <Table
                        max-height="400"
                        border
                        :loading="loading"
                        :columns="overViewColumns"
                        :data="overViewData"
                      ></Table>
                    </div>
                    <br />
                  </Row>
                </Card>
              </div>
              <div v-if="testitem.schoolTestId == 2">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart21"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart22"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart25"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart23"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart24"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 3">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart31"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart32"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart35"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart33"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart34"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 4">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart41"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart42"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart45"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart43"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart44"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 5">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart51"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart52"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart55"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart53"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart54"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 6">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart61"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart62"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart65"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart63"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart64"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 7">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart71"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart72"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart75"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart73"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart74"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 8">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart81"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart82"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart85"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart83"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart84"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 9">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart91"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart92"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart95"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart93"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart94"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 10">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart101"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart102"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart105"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart103"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart104"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
              <div v-else-if="testitem.schoolTestId == 11">
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">数据分析</div>
                    <div :style="{ backgroundColor: '#FFFFFF' }">
                      <Row :style="{ textAlign: 'center' }">
                        <div
                          id="myChart111"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                        <div
                          id="myChart112"
                          :style="{
                            width: '600px',
                            height: '400px',
                            marginTop: '50px',
                            display: 'inline-block',
                          }"
                        ></div>
                      </Row>
                    </div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均成绩</div>
                    <div
                      id="myChart115"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">平均分</div>
                    <div
                      id="myChart113"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
                <div :style="{ marginTop: '20px' }">
                  <Card>
                    <div style="font-size: 20px; height: 40px">合格率</div>
                    <div
                      id="myChart114"
                      :style="{ width: '1500px', height: '400px' }"
                    ></div>
                  </Card>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currutnum: 0,
      selectTabName: "",
      primaryList: [
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
      schoolTestId: null,
      gender: "",
      schoolGradeList: [],
      genderList: [
        {
          itemId: "99",
          itemName: "全部",
        },
        {
          itemId: "1",
          itemName: "男",
        },
        {
          itemId: "2",
          itemName: "女",
        },
      ],
      normalTest: false,
      eyesTest: false,
      highTest: false,
      weightTest: false,
      schoolYear: "",
      schoolId: "",
      loading: false,
      grade: "",
      myChart21: null,
      myChart22: null,
      myChart23: null,
      myChart24: null,
      myChart25: null,
      myChart31: null,
      myChart32: null,
      myChart33: null,
      myChart34: null,
      myChart35: null,
      myChart41: null,
      myChart42: null,
      myChart43: null,
      myChart44: null,
      myChart45: null,
      myChart51: null,
      myChart52: null,
      myChart53: null,
      myChart54: null,
      myChart55: null,
      myChart61: null,
      myChart62: null,
      myChart63: null,
      myChart64: null,
      myChart65: null,
      myChart71: null,
      myChart72: null,
      myChart73: null,
      myChart74: null,
      myChart75: null,
      myChart81: null,
      myChart82: null,
      myChart83: null,
      myChart84: null,
      myChart85: null,
      myChart91: null,
      myChart92: null,
      myChart93: null,
      myChart94: null,
      myChart95: null,
      myChart101: null,
      myChart102: null,
      myChart103: null,
      myChart104: null,
      myChart105: null,
      myChart111: null,
      myChart112: null,
      myChart113: null,
      myChart114: null,
      myChart115: null,
      option1: {},
      myChart2: null,
      option2: {},
      myChart3: null,
      option3: {},
      myChart4: null,
      option4: {},
      myChart5: null,
      option5: {},
      myChartEyes: null,
      optionEyes: {},
      optionEyes1: {},
      myChartHeight: null,
      optionHeight: {},
      myChartHeight1: null,
      optionHeight1: {},
      myChartWeight: null,
      optionWeight: {},
      myChartWeight1: null,
      optionWeight1: {},
      testList: [],
      resultColumns: [
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "已完成/体测总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均成绩",
          key: "averageValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let aver = (this.schoolTestId == 11 || this.schoolTestId == 10 || this.schoolTestId == 7) ? params.row.averageValue.split("m")[0] : params.row.averageValue;

           return h("div", aver);
          },
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.averageScore
                ? 0
                : params.row.averageScore / 100
            );
          },
        },
        {
          title: "优秀率（人数）",
          key: "goodCount",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            let text = `${
              params.row.goodCount == 0
                ? params.row.goodCount
                : (
                    (params.row.goodCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.goodCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "wellCount",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let text = `${
              params.row.wellCount == 0
                ? params.row.wellCount
                : (
                    (params.row.wellCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.wellCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passCount",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let text = `${
              params.row.passCount == 0
                ? params.row.passCount
                : (
                    (params.row.passCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.passCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "excellent",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let excellent = `${params.row.goodCount == 0 ? '0.00' : (params.row.goodCount / params.row.overTestCount * 100).toFixed(2)}`;
            let good = `${params.row.wellCount == 0 ? '0.00' : (params.row.wellCount / params.row.overTestCount * 100).toFixed(2)}`;
            let all = Number(excellent) + Number(good);
            all = all.toFixed(2)
            all = all > 100 ? 100 : all;
            let text = all + "%"
            let count = params.row.goodCount + params.row.wellCount
            text = text + ' （' + count + '人）'
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "qualifiedCount",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let excellent=`${params.row.goodCount == 0? '0.00' : (params.row.goodCount/params.row.overTestCount*100).toFixed(2)}`;
            let good=`${params.row.wellCount == 0? '0.00' : (params.row.wellCount/params.row.overTestCount*100).toFixed(2)}`;
            let pass=`${params.row.passCount == 0? '0.00' : (params.row.passCount/params.row.overTestCount*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good)+Number(pass);
            all=all.toFixed(2)
            all=all>100?100:all;
            let text = all+"%"
            let count = params.row.goodCount + params.row.wellCount + params.row.passCount
            text = text + ' （' + count + '人）'
            return h("div", text);
          },
        },
      ],
      resultData: [],
      weightResultColumns: [
        {
          title: "体测项目",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", "体重");
          },
        },
        {
          title: "已完成/测试总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均体重",
          key: "weightValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.weightValue
                ? 0
                : params.row.weightValue / 100 + "kg"
            );
          },
        },
        {
          title: "体重最大值",
          key: "weightTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.weightTestValue
                ? 0
                : params.row.weightTestValue + "kg"
            );
          },
        },
        {
          title: "体重最小值",
          key: "notWeightTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.notWeightTestValue
                ? 0
                : params.row.notWeightTestValue + "kg"
            );
          },
        },
      ],
      weightOverViewColumns: [
        {
          title: "体测项目",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", "体重");
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.gradeName + params.row.studentClass + "班"
            );
          },
        },
        {
          title: "已完成/测试总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均体重",
          key: "weightValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.weightValue
                ? 0
                : params.row.weightValue / 100 + "kg"
            );
          },
        },
        {
          title: "体重最大值",
          key: "weightTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.weightTestValue
                ? 0
                : params.row.weightTestValue + "kg"
            );
          },
        },
        {
          title: "体重最小值",
          key: "notWeightTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.notWeightTestValue
                ? 0
                : params.row.notWeightTestValue + "kg"
            );
          },
        },
      ],
      highResultColumns: [
        {
          title: "体测项目",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", "身高");
          },
        },
        {
          title: "已完成/测试总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均身高",
          key: "heightValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.heightValue
                ? 0
                : params.row.heightValue / 100 + this.bid
            );
          },
        },
        {
          title: "身高最大值",
          key: "heighTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.heighTestValue
                ? 0
                : params.row.heighTestValue + this.bid
            );
          },
        },
        {
          title: "身高最小值",
          key: "notHeighTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.notHeighTestValue
                ? 0
                : params.row.notHeighTestValue + this.bid
            );
          },
        },
      ],
      highOverViewColumns: [
        {
          title: "体测项目",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", "身高");
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.gradeName + params.row.studentClass + "班"
            );
          },
        },
        // {
        //   title: '总人数',
        //   key: 'studentTotalCount',
        //   align: 'center',
        //   width:100
        // },
        {
          title: "已完成/测试总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均身高",
          key: "heightValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.heightValue
                ? 0
                : params.row.heightValue / 100 + this.bid
            );
          },
        },
        {
          title: "身高最大值",
          key: "heighTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.heighTestValue
                ? 0
                : params.row.heighTestValue + this.bid
            );
          },
        },
        {
          title: "身高最小值",
          key: "notHeighTestValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              null == params.row.notHeighTestValue
                ? 0
                : params.row.notHeighTestValue + this.bid
            );
          },
        },
      ],
      overViewColumns: [
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              params.row.gradeName + params.row.studentClass + "班"
            );
          },
        },
        {
          title: "已完成/体测总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title: "免试人数",
          key: "exemptCount",
          align: "center",
          minWidth: 140,
        },
        {
          title: "平均成绩",
          key: "averageValue",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
             let aver = (this.schoolTestId == 11 || this.schoolTestId == 10 || this.schoolTestId == 7) ? params.row.averageValue.split("m")[0] : params.row.averageValue;
            return h("div", aver);
          },
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            return h("div", params.row.averageScore / 100);
          },
        },
        {
          title: "优秀率（人数）",
          key: "goodCount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            const row = params.row;
            let text = `${
              params.row.goodCount == 0
                ? params.row.goodCount
                :(
                    (params.row.goodCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.goodCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "wellCount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            const row = params.row;
            let text = `${
              params.row.wellCount == 0
                ? params.row.wellCount
                : (
                    (params.row.wellCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.wellCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passCount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            const row = params.row;
            let text = `${
              params.row.passCount == 0
                ? params.row.passCount
                : (
                    (params.row.passCount / params.row.overTestCount) * 100
                  ).toFixed(2)
            }%`;
            text = text + ' （' + params.row.passCount + '人）'
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "excellent",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            const row = params.row;
            let excellent=`${params.row.goodCount == 0? '0.00' : (params.row.goodCount/params.row.overTestCount*100).toFixed(2)}`;
            let good=`${params.row.wellCount == 0? '0.00' : (params.row.wellCount/params.row.overTestCount*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good);
            all=all.toFixed(2)
            all=all>100?100:all;
            let text = all+"%"
            let count = params.row.goodCount + params.row.wellCount
            text = text + ' （' + count + '人）'
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "qualifiedCount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            const row = params.row;
            let excellent=`${params.row.goodCount == 0? '0.00' : (params.row.goodCount/params.row.overTestCount*100).toFixed(2)}`;
            let good=`${params.row.wellCount == 0? '0.00' : (params.row.wellCount/params.row.overTestCount*100).toFixed(2)}`;
            let pass=`${params.row.passCount == 0? '0.00' : (params.row.passCount/params.row.overTestCount*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good)+Number(pass);
            all=all.toFixed(2)
            all=all>100?100:all;
            let text = all+"%"
            let count = params.row.goodCount + params.row.wellCount + params.row.passCount
            text = text + ' （' + count + '人）'
            return h("div", text);
          },
        },
      ],
      overViewData: [],
      scorexAxisData: [],
      scoreseriesData: [],
      passSeriesData: [],
      scoreFractionData: [],
      heightValue: [],
      weightValue: [],
      pageNum: 1,
      pageSize: 10,
      schoolTestIdBy: 0,
      total: 0,
      normalFirst: 0,
      nowCheckNum: 0,
      tittleTabs: "",
      bid: "",
      resultColumnsBMI: [
        {
          title: "总人数",
          key: "totalStudent",
          align: "center",
          width: 100,
        },
        {
          title: "已完成/体测总人数",
          key: "overTestCount",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent +
                "/" +
                (params.row.totalStudent - params.row.exemptStudent)
            );
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
        },
        {
          title: "平均BMI值",
          key: "averageValue",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent
                ? (params.row.totalValue / params.row.finishStudent).toFixed(2)
                : 0
            );
          },
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent
                ? (params.row.totalScore / params.row.finishStudent).toFixed(2)
                : 0
            );
          },
        },
        {
          title: "正常率",
          key: "goodCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.excellentStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
        {
          title: "低体重、超重率",
          key: "wellCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.goodStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
        {
          title: "肥胖率",
          key: "passCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.passStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
      ],
      resultDataBMI: [],
      resultColumnsBMIDetail: [
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            const text =
              params.row.gradeId == "1"
                ? "一年级"
                : params.row.gradeId == "2"
                ? "二年级"
                : params.row.gradeId == "3"
                ? "三年级"
                : params.row.gradeId == "4"
                ? "四年级"
                : params.row.gradeId == "5"
                ? "五年级"
                : params.row.gradeId == "6"
                ? "六年级"
                : params.row.gradeId == "7"
                ? "七年级"
                : params.row.gradeId == "8"
                ? "八年级"
                : params.row.gradeId == "9"
                ? "九年级"
                : params.row.gradeId == "10"
                ? "高一"
                : params.row.gradeId == "11"
                ? "高二"
                : params.row.gradeId == "12"
                ? "高三"
                : "";
            return h("div", text + params.row.studentClass + "班");
          },
        },
        {
          title: "总人数",
          key: "totalStudent",
          align: "center",
          width: 100,
        },
        {
          title: "已完成/体测总人数",
          key: "overTestCount",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent +
                "/" +
                (params.row.totalStudent - params.row.exemptStudent)
            );
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
        },
        {
          title: "平均BMI值",
          key: "averageValue",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent
                ? (params.row.totalValue / params.row.finishStudent).toFixed(2)
                : 0
            );
          },
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent
                ? (params.row.totalScore / params.row.finishStudent).toFixed(2)
                : 0
            );
          },
        },
        {
          title: "正常率",
          key: "goodCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.excellentStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
        {
          title: "低体重、超重率",
          key: "wellCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.goodStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
        {
          title: "肥胖率",
          key: "passCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent
                ? (
                    (100 * params.row.passStudent) /
                    params.row.finishStudent
                  ).toFixed(2)
                : 0
            }%`;
            return h("div", text);
          },
        },
      ],
      resultDataBMIDetail: [],
      BMIChart1: null,
      optionBMI1: {},
      BMIChart2: null,
      optionBMI2: {},
      BMIChart3: null,
      optionBMI3: {},
      BMIChart4: null,
      optionBMI4: {},
      BMIChart5: null,
      optionBMI5: {},
      otherGender:''
    };
  },
  methods: {
    selectTabs(name) {
      var vm=this;
      this.schoolTestId = name;
      this.nowCheckNum = name;
      for(let i=0;i<vm.testList.length;i++){
        if(name==vm.testList[i].schoolTestId){
          vm.otherGender=vm.testList[i].testGender
          break;
        }
      }
      this.bid =
        name == 1
          ? "cm"
          : name == 2
          ? "ml"
          : name == 3
          ? "s"
          : name == 4
          ? "cm"
          : name == 5
          ? "次"
          : name == 6
          ? "次"
          : name == 7
          ? "m‘s“"
          : name == 8
          ? "cm"
          : name == 9
          ? "次"
          : name == 10
          ? "m‘s“"
          : name == 11
          ? "m‘s“"
          : name == 12
          ? "kg"
          : "";
      if (name == 1) {
        this.normalTest = false;
        this.eyesTest = false;
        this.weightTest = false;
        this.highTest = true;
        this.searchTestInfo(name);
      } else if (name == 12) {
        this.normalTest = false;
        this.eyesTest = false;
        this.weightTest = true;
        this.highTest = false;
        this.searchTestInfo(name);
      } else if (name == 10000) {
        this.getBmiItemStatistical();
      } else {
        this.normalTest = true;
        this.eyesTest = false;
        this.weightTest = false;
        this.highTest = false;
        this.searchTestInfo(name);
      }
    },
    pageToList() {
      this.$router.go(-1);
    },
    querySearch() {
      this.searchTestListfirst();
    },
    //页码改变方法处理
    pageNumChange(value) {
      if (this.pageNum != value) {
        this.pageNum = value;
      }
    },
    //页面大小改变方法处理
    pageSizechange(value) {
      if (this.pageSize != value) {
        this.pageNum = 1;
        this.pageSize = value;
      }
    },
    exportSchoolTestData() {
      var vm = this;
      let currentgender = "";
      if (vm.gender == 99) {
        currentgender = "";
      } else {
        currentgender = vm.gender;
      }
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof currentgender == "undefined") {
        currentgender = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/test/queryexport/exportClassProjctDataBySchoolTestId?grade=" +
        vm.grade +
        "&schoolId=" +
        vm.schoolId +
        "&type=2&gender=" +
        currentgender;
      window.open(url);
    },
    drawGenSLine(num) {
      var vm = this;
      if (num == 2) {
        vm.myChart21 = this.$echarts.init(document.getElementById("myChart21"));
      } else if (num == 3) {
        vm.myChart31 = this.$echarts.init(document.getElementById("myChart31"));
      } else if (num == 4) {
        vm.myChart41 = this.$echarts.init(document.getElementById("myChart41"));
      } else if (num == 5) {
        vm.myChart51 = this.$echarts.init(document.getElementById("myChart51"));
      } else if (num == 6) {
        vm.myChart61 = this.$echarts.init(document.getElementById("myChart61"));
      } else if (num == 7) {
        vm.myChart71 = this.$echarts.init(document.getElementById("myChart71"));
      } else if (num == 8) {
        vm.myChart81 = this.$echarts.init(document.getElementById("myChart81"));
      } else if (num == 9) {
        vm.myChart91 = this.$echarts.init(document.getElementById("myChart91"));
      } else if (num == 10) {
        vm.myChart101 = this.$echarts.init(
          document.getElementById("myChart101")
        );
      } else if (num == 11) {
        vm.myChart111 = this.$echarts.init(
          document.getElementById("myChart111")
        );
      }
      vm.option1 = {
        title: {
          text: "体测情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          orient: "vertical",
          left: "0%",
          data: ["免试人数", "完成人数", "未参加人数", "已参加未完成人数"],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: vm.resultData[0].exemptCount, name: "免试人数" },
              { value: vm.resultData[0].overTestCount, name: "完成人数" },
              {
                value:
                  vm.resultData[0].needJoinTestCount -
                  vm.resultData[0].joinTestCount,
                name: "未参加人数",
              },
              {
                value:
                  vm.resultData[0].joinTestCount -
                  vm.resultData[0].overTestCount,
                name: "已参加未完成人数",
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4fa995", "#f1d776", "#e99954", "#e58467"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      if (num == 2) {
        vm.myChart21.setOption(vm.option1);
      } else if (num == 3) {
        vm.myChart31.setOption(vm.option1);
      } else if (num == 4) {
        vm.myChart41.setOption(vm.option1);
      } else if (num == 5) {
        vm.myChart51.setOption(vm.option1);
      } else if (num == 6) {
        vm.myChart61.setOption(vm.option1);
      } else if (num == 7) {
        vm.myChart71.setOption(vm.option1);
      } else if (num == 8) {
        vm.myChart81.setOption(vm.option1);
      } else if (num == 9) {
        vm.myChart91.setOption(vm.option1);
      } else if (num == 10) {
        vm.myChart101.setOption(vm.option1);
      } else if (num == 11) {
        vm.myChart111.setOption(vm.option1);
      }
    },
    drawGenSLine2(num) {
      var vm = this;
      if (num == 2) {
        vm.myChart22 = this.$echarts.init(document.getElementById("myChart22"));
      } else if (num == 3) {
        vm.myChart32 = this.$echarts.init(document.getElementById("myChart32"));
      } else if (num == 4) {
        vm.myChart42 = this.$echarts.init(document.getElementById("myChart42"));
      } else if (num == 5) {
        vm.myChart52 = this.$echarts.init(document.getElementById("myChart52"));
      } else if (num == 6) {
        vm.myChart62 = this.$echarts.init(document.getElementById("myChart62"));
      } else if (num == 7) {
        vm.myChart72 = this.$echarts.init(document.getElementById("myChart72"));
      } else if (num == 8) {
        vm.myChart82 = this.$echarts.init(document.getElementById("myChart82"));
      } else if (num == 9) {
        vm.myChart92 = this.$echarts.init(document.getElementById("myChart92"));
      } else if (num == 10) {
        vm.myChart102 = this.$echarts.init(
          document.getElementById("myChart102")
        );
      } else if (num == 11) {
        vm.myChart112 = this.$echarts.init(
          document.getElementById("myChart112")
        );
      }
      vm.option2 = {
        title: {
          text: "等级情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["优秀数", "良好数", "及格数", "不及格数"],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: vm.resultData[0].goodCount,
                name: "优秀数",
                itemStyle: {},
              },
              { value: vm.resultData[0].wellCount, name: "良好数" },
              { value: vm.resultData[0].passCount, name: "及格数" },
              { value: vm.resultData[0].notPassCount, name: "不及格数" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4abce4", "#699bc9", "#bdd685", "#95c685"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      // vm.myChart2.setOption(vm.option2, true);
      if (num == 2) {
        vm.myChart22.setOption(vm.option2);
      } else if (num == 3) {
        vm.myChart32.setOption(vm.option2);
      } else if (num == 4) {
        vm.myChart42.setOption(vm.option2);
      } else if (num == 5) {
        vm.myChart52.setOption(vm.option2);
      } else if (num == 6) {
        vm.myChart62.setOption(vm.option2);
      } else if (num == 7) {
        vm.myChart72.setOption(vm.option2);
      } else if (num == 8) {
        vm.myChart82.setOption(vm.option2);
      } else if (num == 9) {
        vm.myChart92.setOption(vm.option2);
      } else if (num == 10) {
        vm.myChart102.setOption(vm.option2);
      } else if (num == 11) {
        vm.myChart112.setOption(vm.option2);
      }
    },
    drawGenSLineHeight() {
      var vm = this;
      this.$nextTick(() => {
        vm.myChartHeight = this.$echarts.init(
          document.getElementById("myChartHeight")
        );
        vm.optionHeight = {
          title: {
            text: "体测情况图形分布",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "vertical",
            left: "0%",
            data: ["免试率", "完成率", "未参加率", "已参加未完成率"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: vm.resultData[0].exemptCount, name: "免试率" },
                { value: vm.resultData[0].overTestCount, name: "完成率" },
                {
                  value:
                    vm.resultData[0].needJoinTestCount -
                    vm.resultData[0].joinTestCount,
                  name: "未参加率",
                },
                {
                  value:
                    vm.resultData[0].joinTestCount -
                    vm.resultData[0].overTestCount,
                  name: "已参加未完成率",
                },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4fa995",
                      "#f1d776",
                      "#e99954",
                      "#e58467",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              label: {
                show: true,
                formatter: "{b} : ({d}%)",
              },
            },
          ],
        };
        vm.myChartHeight.setOption(vm.optionHeight);
      });
    },
    drawGenSLineWeight() {
      var vm = this;
      this.$nextTick(() => {
        vm.myChartWeight = this.$echarts.init(
          document.getElementById("myChartWeight")
        );
        vm.optionWeight = {
          title: {
            text: "体测情况图形分布",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "vertical",
            left: "0%",
            data: ["免试人数", "完成人数", "未参加人数", "已参加未完成人数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: vm.resultData[0].exemptCount, name: "免试人数" },
                { value: vm.resultData[0].overTestCount, name: "完成人数" },
                {
                  value:
                    vm.resultData[0].needJoinTestCount -
                    vm.resultData[0].joinTestCount,
                  name: "未参加人数",
                },
                {
                  value:
                    vm.resultData[0].joinTestCount -
                    vm.resultData[0].overTestCount,
                  name: "已参加未完成人数",
                },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4fa995",
                      "#f1d776",
                      "#e99954",
                      "#e58467",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              label: {
                show: true,
                formatter: "{b} : ({d}%)",
              },
            },
          ],
        };
        vm.myChartWeight.setOption(vm.optionWeight);
      });
    },
    drawBar1(num) {
      var vm = this;
      if (num == 2) {
        vm.myChart23 = this.$echarts.init(document.getElementById("myChart23"));
      } else if (num == 3) {
        vm.myChart33 = this.$echarts.init(document.getElementById("myChart33"));
      } else if (num == 4) {
        vm.myChart43 = this.$echarts.init(document.getElementById("myChart43"));
      } else if (num == 5) {
        vm.myChart53 = this.$echarts.init(document.getElementById("myChart53"));
      } else if (num == 6) {
        vm.myChart63 = this.$echarts.init(document.getElementById("myChart63"));
      } else if (num == 7) {
        vm.myChart73 = this.$echarts.init(document.getElementById("myChart73"));
      } else if (num == 8) {
        vm.myChart83 = this.$echarts.init(document.getElementById("myChart83"));
      } else if (num == 9) {
        vm.myChart93 = this.$echarts.init(document.getElementById("myChart93"));
      } else if (num == 10) {
        vm.myChart103 = this.$echarts.init(
          document.getElementById("myChart103")
        );
      } else if (num == 11) {
        vm.myChart113 = this.$echarts.init(
          document.getElementById("myChart113")
        );
      }
      vm.option3 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "分",
        },
        series: [
          {
            data: vm.scoreseriesData,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      // vm.myChart3.setOption(vm.option3);
      if (num == 2) {
        vm.myChart23.setOption(vm.option3);
      } else if (num == 3) {
        vm.myChart33.setOption(vm.option3);
      } else if (num == 4) {
        vm.myChart43.setOption(vm.option3);
      } else if (num == 5) {
        vm.myChart53.setOption(vm.option3);
      } else if (num == 6) {
        vm.myChart63.setOption(vm.option3);
      } else if (num == 7) {
        vm.myChart73.setOption(vm.option3);
      } else if (num == 8) {
        vm.myChart83.setOption(vm.option3);
      } else if (num == 9) {
        vm.myChart93.setOption(vm.option3);
      } else if (num == 10) {
        vm.myChart103.setOption(vm.option3);
      } else if (num == 11) {
        vm.myChart113.setOption(vm.option3);
      }
    },
    drawBar2(num) {
      var vm = this;
      if (num == 2) {
        vm.myChart24 = this.$echarts.init(document.getElementById("myChart24"));
      } else if (num == 3) {
        vm.myChart34 = this.$echarts.init(document.getElementById("myChart34"));
      } else if (num == 4) {
        vm.myChart44 = this.$echarts.init(document.getElementById("myChart44"));
      } else if (num == 5) {
        vm.myChart54 = this.$echarts.init(document.getElementById("myChart54"));
      } else if (num == 6) {
        vm.myChart64 = this.$echarts.init(document.getElementById("myChart64"));
      } else if (num == 7) {
        vm.myChart74 = this.$echarts.init(document.getElementById("myChart74"));
      } else if (num == 8) {
        vm.myChart84 = this.$echarts.init(document.getElementById("myChart84"));
      } else if (num == 9) {
        vm.myChart94 = this.$echarts.init(document.getElementById("myChart94"));
      } else if (num == 10) {
        vm.myChart104 = this.$echarts.init(
          document.getElementById("myChart104")
        );
      } else if (num == 11) {
        vm.myChart114 = this.$echarts.init(
          document.getElementById("myChart114")
        );
      }
      vm.option4 = {
        title: {
          // text: '合格率',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "%",
        },
        series: [
          {
            data: vm.passSeriesData,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      // vm.myChart4.setOption(vm.option4, true);
      if (num == 2) {
        vm.myChart24.setOption(vm.option4);
      } else if (num == 3) {
        vm.myChart34.setOption(vm.option4);
      } else if (num == 4) {
        vm.myChart44.setOption(vm.option4);
      } else if (num == 5) {
        vm.myChart54.setOption(vm.option4);
      } else if (num == 6) {
        vm.myChart64.setOption(vm.option4);
      } else if (num == 7) {
        vm.myChart74.setOption(vm.option4);
      } else if (num == 8) {
        vm.myChart84.setOption(vm.option4);
      } else if (num == 9) {
        vm.myChart94.setOption(vm.option4);
      } else if (num == 10) {
        vm.myChart104.setOption(vm.option4);
      } else if (num == 11) {
        vm.myChart114.setOption(vm.option4);
      }
    },
    drawBar3(num) {
      var vm = this;
      if (num == 2) {
        vm.myChart25 = this.$echarts.init(document.getElementById("myChart25"));
      } else if (num == 3) {
        vm.myChart35 = this.$echarts.init(document.getElementById("myChart35"));
      } else if (num == 4) {
        vm.myChart45 = this.$echarts.init(document.getElementById("myChart45"));
      } else if (num == 5) {
        vm.myChart55 = this.$echarts.init(document.getElementById("myChart55"));
      } else if (num == 6) {
        vm.myChart65 = this.$echarts.init(document.getElementById("myChart65"));
      } else if (num == 7) {
        vm.myChart75 = this.$echarts.init(document.getElementById("myChart75"));
      } else if (num == 8) {
        vm.myChart85 = this.$echarts.init(document.getElementById("myChart85"));
      } else if (num == 9) {
        vm.myChart95 = this.$echarts.init(document.getElementById("myChart95"));
      } else if (num == 10) {
        vm.myChart105 = this.$echarts.init(
          document.getElementById("myChart105")
        );
      } else if (num == 11) {
        vm.myChart115 = this.$echarts.init(
          document.getElementById("myChart115")
        );
      }
      vm.option5 = {
        title: {
          // text: '平均成绩1',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: this.bid,
        },
        series: [
          {
            data: vm.scoreFractionData,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: (params) => {
                if (num == 2 || num == 5 || num == 6 || num == 9) {
                  return params.data.toFixed(0) + this.bid;
                } else {
                  return this.bid == "m‘s“"
                    ? String(params.data).replace(".", "'")
                    : String(params.data) + this.bid;
                }
              },
            },
          },
        ],
      };
      // vm.myChart5.setOption(vm.option5, true);
      if (num == 2) {
        vm.myChart25.setOption(vm.option5);
      } else if (num == 3) {
        vm.myChart35.setOption(vm.option5);
      } else if (num == 4) {
        vm.myChart45.setOption(vm.option5);
      } else if (num == 5) {
        vm.myChart55.setOption(vm.option5);
      } else if (num == 6) {
        vm.myChart65.setOption(vm.option5);
      } else if (num == 7) {
        vm.myChart75.setOption(vm.option5);
      } else if (num == 8) {
        vm.myChart85.setOption(vm.option5);
      } else if (num == 9) {
        vm.myChart95.setOption(vm.option5);
      } else if (num == 10) {
        vm.myChart105.setOption(vm.option5);
      } else if (num == 11) {
        vm.myChart115.setOption(vm.option5);
      }
    },
    drawBarHeght1() {
      var vm = this;
      vm.myChartHeight1 = this.$echarts.init(
        document.getElementById("myChartHeight1")
      );
      vm.optionHeight1 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "CM",
        },
        series: [
          {
            data: vm.heightValue,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: (params) => {
                return String(params.data) + "CM";
              },
            },
          },
        ],
      };
      vm.myChartHeight1.setOption(vm.optionHeight1);
    },
    drawBarWeight1() {
      var vm = this;
      vm.myChartWeight1 = this.$echarts.init(
        document.getElementById("myChartWeight1")
      );
      vm.optionWeight1 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "KG",
        },
        series: [
          {
            data: vm.weightValue,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: (params) => {
                return String(params.data) + "KG";
              },
            },
          },
        ],
      };
      vm.myChartWeight1.setOption(vm.optionWeight1);
    },
    searchTestList() {
      let bmi = {
        schoolTestId: 10000,
        schoolTestName: "BMI",
        testGender: 0,
      };
      this.$axios
        .get(
          `/v1/test/query/queryNeedTestListByGride?grade=${
            this.grade == 99 ? "" : this.grade
          }&gender=${this.gender == 99 ? "" : this.gender}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let tempTestList = res.data.response;
            let tempInfo = null;
            for (let i = 0; i < tempTestList.length; i++) {
              if (tempTestList[i].schoolTestId == 12) {
                tempInfo = tempTestList[i];
              }
            }
            let testListTemp = [];
            for (let i = 0; i < tempTestList.length; i++) {
              if (tempTestList[i].schoolTestId == 12) {
                continue;
              } else if (tempTestList[i].schoolTestId == 1) {
                testListTemp.push(tempTestList[i]);
                testListTemp.push(tempInfo);
                testListTemp.push(bmi);
              } else {
                testListTemp.push(tempTestList[i]);
              }
            }
            this.testList = testListTemp;
            this.selectTabs(this.testList[0].schoolTestId);
          }
        });
    },
    searchTestListfirst() {
      let bmi = {
        schoolTestId: 10000,
        schoolTestName: "BMI",
        testGender: 0,
      };
      this.testList = [];
      this.loading = true;
      this.$axios
        .get(
          `/v1/test/query/queryNeedTestListByGride?grade=${
            this.grade == 99 ? "" : this.grade
          }&gender=${this.gender == 99 ? "" : this.gender}`
        )
        .then((res) => {
          this.loading = false;
          if (res.data.code == 10000) {
            let tempTestList = res.data.response;
            let tempInfo = null;
            for (let i = 0; i < tempTestList.length; i++) {
              if (tempTestList[i].schoolTestId == 12) {
                tempInfo = tempTestList[i];
              }
            }
            let testListTemp = [];
            for (let i = 0; i < tempTestList.length; i++) {
              if (tempTestList[i].schoolTestId == 12) {
              } else if (tempTestList[i].schoolTestId == 1) {
                testListTemp.push(tempTestList[i]);
                testListTemp.push(tempInfo);
                testListTemp.push(bmi);
              } else {
                testListTemp.push(tempTestList[i]);
              }
            }
            this.testList = testListTemp;
            if (this.testList != null && this.testList.length > 0) {
              if (this.gender == "99") {
                for (let i = 0; i < this.testList.length; i++) {
                  if (this.testList[i].testGender == 1) {
                    this.testList[i].schoolTestName =
                      this.testList[i].schoolTestName + "(男)";
                  } else if (this.testList[i].testGender == 2) {
                    this.testList[i].schoolTestName =
                      this.testList[i].schoolTestName + "(女)";
                  }
                }
              }
            }
            if (this.testList != null && this.testList.length > 0) {
              this.tittleTabs = this.testList[0].schoolTestId + "";
              this.selectTabs(this.testList[0].schoolTestId);
            }
          }
        });
    },
    searchTestInfo(name) {
      let vm = this;
      let num = name;
      if (name == 10000) {
        vm.getBmiItemStatistical();
      } else {
        let currentgender = "";
        vm.loading = true;
        if (vm.gender == 99) {
          currentgender = "";
        } else {
          currentgender = vm.gender;
        }
        console.log(vm.otherGender)
        let aa=vm.otherGender? (vm.grade == 99 ?vm.otherGender : vm.grade):""
        console.log(aa)
        this.$axios
          .get(
            `/v1/test/query/queryThisYearActivityProjectList?grade=${
              vm.grade == 99 ?"": vm.grade
            }&schoolId=${vm.schoolId}&schoolTestId=${num}&type=2&gender=${
              vm.otherGender? (this.gender == 99 ? vm.otherGender :vm.gender) : ""
            }`
          )
          .then((res) => {
            vm.loading = false;
            if (res.data.code == 10000) {
              this.resultData = res.data.response;
              let data = [],
                datas = [];
              if (res.data.response.length <= 0) {
                data = [
                  { value: 0, name: "免试人数" },
                  { value: 0, name: "完成人数" },
                  { value: 0, name: "未参加人数" },
                  { value: 0, name: "已参加未完成人数" },
                ];
                datas = [
                  { value: 0, name: "优秀数", itemStyle: {} },
                  { value: 0, name: "良好数" },
                  { value: 0, name: "及格数" },
                  { value: 0, name: "不及格数" },
                ];
              } else {
                data = [
                  { value: vm.resultData[0].exemptCount, name: "免试人数" },
                  { value: vm.resultData[0].overTestCount, name: "完成人数" },
                  {
                    value:
                      vm.resultData[0].needJoinTestCount -
                      vm.resultData[0].joinTestCount,
                    name: "未参加人数",
                  },
                  {
                    value:
                      vm.resultData[0].joinTestCount -
                      vm.resultData[0].overTestCount,
                    name: "已参加未完成人数",
                  },
                ];
                datas = [
                  {
                    value: vm.resultData[0].goodCount,
                    name: "优秀数",
                    itemStyle: {},
                  },
                  { value: vm.resultData[0].wellCount, name: "良好数" },
                  { value: vm.resultData[0].passCount, name: "及格数" },
                  { value: vm.resultData[0].notPassCount, name: "不及格数" },
                ];
              }
              if (name == 7 || name == 10 || name == 11) {
                for (let i = 0; i < this.resultData.length; i++) {
                  this.resultData[i].averageValue =
                    Math.floor(this.resultData[i].averageValue / 100 / 60) +
                    "'" +
                    ((Math.floor(this.resultData[i].averageValue / 100) % 60) +
                      "m‘s“");
                }
              } else if (name == 2 || name == 5 || name == 6 || name == 9) {
                for (let i = 0; i < this.resultData.length; i++) {
                  if (null == this.resultData[i]) {
                    this.resultData[i].averageScore = 0;
                    this.resultData[i].averageValue = 0;
                  } else {
                    this.resultData[i].averageValue =
                      (this.resultData[i].averageValue / 100).toFixed(0) +
                      this.bid;
                  }
                }
              } else {
                for (let i = 0; i < this.resultData.length; i++) {
                  if (null == this.resultData[i]) {
                    this.resultData[i].averageValue = 0;
                  } else {
                    this.resultData[i].averageValue =
                      this.resultData[i].averageValue / 100 + this.bid;
                  }
                }
              }

              if (name == 1) {
                this.drawGenSLineHeight();
              } else if (name == 12) {
                this.drawGenSLineWeight();
              } else {
                this.drawGenSLine(num);
                this.drawGenSLine2(num);
              }

              this.$axios
                .get(
                  "/v1/test/query/queryClassActivityProjectList?grade=" +
                    vm.grade +
                    "&schoolId=" +
                    vm.schoolId +
                    "&schoolTestId=" +
                    num +
                    "&type=2&gender=" +
                    (vm.otherGender? (this.gender == 99 ? vm.otherGender :vm.gender) : "")
                )
                .then((res) => {
                  vm.loading = false;
                  if (res.data.code == 10000) {
                    this.overViewData = res.data.response;

                    // this.option1 = {};
                    // this.option2 = {};
                    this.scorexAxisData = [];
                    this.scoreseriesData = [];
                    this.passSeriesData = [];
                    this.scoreFractionData = [];
                    this.heightValue = [];
                    this.weightValue = [];
                    for (let val of this.overViewData) {
                      this.heightValue.push(val.heightValue / 100);
                      this.weightValue.push(val.weightValue / 100);
                      if (name == 7 || name == 10 || name == 11) {
                        this.scoreFractionData.push(
                          Math.floor(val.averageValue / 100 / 60) +
                            Math.floor((val.averageValue / 100) % 60) / 100
                        );
                      } else {
                        this.scoreFractionData.push(val.averageValue / 100);
                      }
                      this.scorexAxisData.push(val.studentClass + "班");
                      this.scoreseriesData.push(val.averageScore / 100);
                      let excellent=`${val.goodCount == 0? '0.00' : (val.goodCount/val.overTestCount*100).toFixed(2)}`;
                    let good=`${val.wellCount == 0? '0.00' : (val.wellCount/val.overTestCount*100).toFixed(2)}`;
                    let pass=`${val.passCount == 0? '0.00' : (val.passCount/val.overTestCount*100).toFixed(2)}`;
                    let all=Number(excellent)+Number(good)+Number(pass);
                    all=all.toFixed(2)
                    all=all>100?100:all;

                    this.passSeriesData.push(all)
                      // this.passSeriesData.push(
                      //   val.qualifiedCount == 0
                      //     ? val.qualifiedCount
                      //     : Math.floor(
                      //         (val.qualifiedCount / val.overTestCount) * 100
                      // //       )
                      // );
                    }
                    if (name == 7 || name == 10 || name == 11) {
                      for (let i = 0; i < this.overViewData.length; i++) {
                        this.overViewData[i].averageValue =
                          Math.floor(
                            this.overViewData[i].averageValue / 100 / 60
                          ) +
                          "'" +
                          ((Math.floor(
                            this.overViewData[i].averageValue / 100
                          ) %
                            60) +
                            "m‘s“");
                      }
                    } else if (
                      name == 2 ||
                      name == 5 ||
                      name == 6 ||
                      name == 9
                    ) {
                      for (let i = 0; i < this.overViewData.length; i++) {
                        if (null == this.overViewData[i]) {
                          this.overViewData[i].averageValue = 0 + this.bid;
                        } else {
                          this.overViewData[i].averageValue =
                            (this.overViewData[i].averageValue / 100).toFixed(
                              0
                            ) + this.bid;
                        }
                      }
                    } else {
                      for (let i = 0; i < this.overViewData.length; i++) {
                        if (null == this.overViewData[i]) {
                          this.overViewData[i].averageValue = 0 + this.bid;
                        } else {
                          this.overViewData[i].averageValue =
                            this.overViewData[i].averageValue / 100 + this.bid;
                        }
                      }
                    }
                    if (name == 1) {
                      this.drawBarHeght1();
                    } else if (name == 12) {
                      this.drawBarWeight1();
                    } else if (name == 13) {
                    } else {
                      this.drawBar1(num);
                      this.drawBar2(num);
                      this.drawBar3(num);
                    }
                  }
                });
            }
          });
      }
    },
    getBmiItemStatistical() {
      let vm = this;
      this.$axios
        .get(
          "/v1/test/query/getBmiItemStatistical?gradeId=" +
            vm.grade +
            "&gender=" +
            vm.gender
        )
        .then((res) => {
          vm.resultDataBMI = [];
          vm.resultDataBMIDetail = [];
          if (res.data.code == 10000) {
            let data = res.data.response;
            if (data && data.length > 0) {
              let gradeInfo = {
                totalStudent: 0,
                finishStudent: 0,
                exemptStudent: 0,
                totalValue: 0,
                totalScore: 0,
                excellentStudent: 0,
                goodStudent: 0,
                passStudent: 0,
                notPassStudent: 0,
                joinNotFinish: 0,
              };
              for (let i = 0; i < data.length; i++) {
                let classInfo = data[i];
                gradeInfo.totalStudent += classInfo.totalStudent;
                gradeInfo.finishStudent += classInfo.finishStudent;
                gradeInfo.exemptStudent += classInfo.exemptStudent;
                gradeInfo.totalValue += classInfo.totalValue;
                gradeInfo.totalScore += classInfo.totalScore;
                gradeInfo.excellentStudent += classInfo.excellentStudent;
                gradeInfo.goodStudent += classInfo.goodStudent;
                gradeInfo.passStudent += classInfo.passStudent;
                gradeInfo.notPassStudent += classInfo.notPassStudent;
                gradeInfo.joinNotFinish += classInfo.joinNotFinish;
              }
              vm.resultDataBMI.push(gradeInfo);

              vm.drawBarBMI1(gradeInfo);
              vm.drawBarBMI2(gradeInfo);
              vm.bmiLine1(data);
              vm.bmiLine2(data);
              vm.bmiLine3(data);
            }
            vm.resultDataBMIDetail = data;
          }
        });
    },
    drawBarBMI1(gradeInfo) {
      var vm = this;
      vm.BMIChart1 = this.$echarts.init(document.getElementById("bmiChart1"));
      vm.optionBMI1 = {
        title: {
          text: "体测情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          orient: "vertical",
          left: "0%",
          data: ["免试人数", "完成人数", "未参加人数", "已参加未完成人数"],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: gradeInfo.exemptStudent, name: "免试人数" },
              { value: gradeInfo.finishStudent, name: "完成人数" },
              {
                value:
                  gradeInfo.totalStudent -
                  gradeInfo.exemptStudent -
                  gradeInfo.finishStudent -
                  gradeInfo.joinNotFinish,
                name: "未参加人数",
              },
              { value: gradeInfo.joinNotFinish, name: "已参加未完成人数" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4fa995", "#f1d776", "#e99954", "#e58467"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      vm.BMIChart1.setOption(vm.optionBMI1, true);
    },
    drawBarBMI2(gradeInfo) {
      var vm = this;
      vm.BMIChart2 = this.$echarts.init(document.getElementById("bmiChart2"));
      vm.optionBMI2 = {
        title: {
          text: "等级情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["正常人数", "低体重、超重人数", "肥胖人数"],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: gradeInfo.excellentStudent, name: "正常人数" },
              { value: gradeInfo.goodStudent, name: "低体重、超重人数" },
              { value: gradeInfo.passStudent, name: "肥胖人数" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4fa995", "#f1d776", "#e99954", "#e58467"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      vm.BMIChart2.setOption(vm.optionBMI2, true);
    },
    bmiLine1(data) {
      var vm = this;
      vm.BMIChart3 = this.$echarts.init(document.getElementById("bmiChart3"));
      let gradeList = [];
      let dataList = [];
      for (let i = 0; i < data.length; i++) {
        let classInfo = data[i];
        let className = classInfo.studentClass + "班";
        let average = classInfo.finishStudent
          ? (classInfo.totalValue / classInfo.finishStudent).toFixed(2)
          : 0;
        gradeList.push(className);
        dataList.push(average);
      }
      vm.optionBMI3 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: gradeList,
        },
        yAxis: {
          type: "value",
          name: "",
        },
        series: [
          {
            data: dataList,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: (params) => {
                return String(params.data);
              },
            },
          },
        ],
      };
      vm.BMIChart3.setOption(vm.optionBMI3, true);
    },
    bmiLine2(data) {
      var vm = this;
      vm.BMIChart4 = this.$echarts.init(document.getElementById("bmiChart4"));
      let gradeList = [];
      let dataList = [];
      for (let i = 0; i < data.length; i++) {
        let classInfo = data[i];
        let className = classInfo.studentClass + "班";
        let average = classInfo.finishStudent
          ? (classInfo.totalScore / classInfo.finishStudent).toFixed(2)
          : 0;
        gradeList.push(className);
        dataList.push(average);
      }
      vm.optionBMI4 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: gradeList,
        },
        yAxis: {
          type: "value",
          name: "分",
        },
        series: [
          {
            data: dataList,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      vm.BMIChart4.setOption(vm.optionBMI4, true);
    },
    bmiLine3(data) {
      var vm = this;
      vm.BMIChart5 = this.$echarts.init(document.getElementById("bmiChart5"));
      let gradeList = [];
      let dataList = [];
      for (let i = 0; i < data.length; i++) {
        let classInfo = data[i];
        let className = classInfo.studentClass + "班";
        let average = classInfo.finishStudent
          ? ((100 * classInfo.passStudent) / classInfo.finishStudent).toFixed(2)
          : 0;
        gradeList.push(className);
        dataList.push(average);
      }
      vm.optionBMI5 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "班级",
          data: gradeList,
        },
        yAxis: {
          type: "value",
          name: "%",
        },
        series: [
          {
            data: dataList,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      vm.BMIChart5.setOption(vm.optionBMI5, true);
    },
  },
  mounted() {
    let vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let SchoolYear = sessionStorage.getItem("historyData_SchoolYear");
    this.schoolYear = SchoolYear;
    let type = sessionStorage.getItem("schoolType");
    /**1 幼儿园 2小学 3初中 4高中 5大学 6教育局'**/
    if (type == 2) {
      vm.schoolGradeList = [
        { val: "一年级", gradeId: "1" },
        { val: "二年级", gradeId: "2" },
        { val: "三年级", gradeId: "3" },
        { val: "四年级", gradeId: "4" },
        { val: "五年级", gradeId: "5" },
        { val: "六年级", gradeId: "6" },
      ];
    } else if (type == 3) {
      vm.schoolGradeList = [
        { val: "七年级", gradeId: "7" },
        { val: "八年级", gradeId: "8" },
        { val: "九年级", gradeId: "9" },
      ];
    } else if (type == 4) {
      vm.schoolGradeList = [
        { val: "高一", gradeId: "10" },
        { val: "高二", gradeId: "11" },
        { val: "高三", gradeId: "12" },
      ];
    } else {
      console.log("学校类型有误");
    }
    this.grade = vm.schoolGradeList[0].gradeId;
    this.gender = "99";
    this.searchTestListfirst();
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
